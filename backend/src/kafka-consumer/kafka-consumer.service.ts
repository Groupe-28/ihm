import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Consumer, Kafka } from 'kafkajs';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  constructor(private logsService: LogsService) {}

  private kafka: Kafka;
  private consumer: Consumer;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'nestjs-app',
      brokers: ['kafka:9092'], // Update with your Kafka broker configuration
      logLevel: 4,
    });

    this.consumer = this.kafka.consumer({ groupId: 'nest-consumer' }); // Update with your desired consumer group ID

    await this.consumer.connect();
    this.consumer.on(this.consumer.events.HEARTBEAT, (event) => {
      console.log('Heartbeat event', event);
    });

    await this.consumer.subscribe({ topic: 'logs' }); // Update with your desired topic

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic === 'logs') {
          // transform message.value buffer to string
          const data = JSON.parse(message.value.toString());
          await this.handleLogsTopic(data);
        }
      },
    });
  }

  async checkConnection() {
    try {
      await this.kafka.admin().fetchTopicMetadata({ topics: ['logs'] });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async handleLogsTopic(data: Prisma.LogCreateManyInput) {
    try {
      await this.logsService.createLog(data);
    } catch (error) {
      console.error(error);
    }
  }
}
