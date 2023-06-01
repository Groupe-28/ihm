import { Module } from '@nestjs/common';
import { LogsModule } from '../logs/logs.module'; // Import the LogsModule
import { KafkaConsumerService } from './kafka-consumer.service';
import { KafkaConsumerController } from './kafka-consumer.controller';

@Module({
  imports: [LogsModule], // Import the LogsModule to make the LogsService available
  providers: [KafkaConsumerService],
  exports: [KafkaConsumerService],
  controllers: [KafkaConsumerController],
})
export class KafkaConsumerModule {}
