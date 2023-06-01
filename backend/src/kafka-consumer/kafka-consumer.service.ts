import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  constructor(private logsService: LogsService) {}

  private kafka: Kafka;
  private consumer: Consumer;
  private producer: Producer;
  private robotConnected = false;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'nestjs-app',
      brokers: ['kafka:9092'], // Update with your Kafka broker configuration
      logLevel: 4,
    });

    this.consumer = this.kafka.consumer({ groupId: 'nest-consumer' }); // Update with your desired consumer group ID
    this.producer = this.kafka.producer();

    await this.consumer.connect();
    await this.producer.connect();

    this.consumer.on(this.consumer.events.HEARTBEAT, (event) => {
      //  console.log('Heartbeat event', event);
    });

    await this.consumer.subscribe({
      topics: ['logs', 'connection-status'],
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic === 'logs') {
          // transform message.value buffer to string
          const data = JSON.parse(message.value.toString());
          await this.handleLogsTopic(data);
        } else if (topic === 'connection-status') {
          const connected = message.value.toString() === 'ok';
          if (connected !== this.robotConnected) {
            this.robotConnected = connected;
            console.log(`Robot connection status: ${connected}`);
          }
        }
      },
    });
  }

  async checkConnectionWithRobot() {
    try {
      await this.kafka.admin().fetchTopicMetadata({ topics: ['logs'] });
      await this.producer.send({
        topic: 'connection-status',
        messages: [
          {
            value: 'request',
          },
        ],
      });

      return this.robotConnected;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async handleLogsTopic(data: Prisma.LogCreateManyInput) {
    try {
      const content =
        typeof data.content === 'string'
          ? data.content
          : JSON.stringify(data.content);
      await this.logsService.createLog({
        ...data,
        content,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
