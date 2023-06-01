import { Module } from '@nestjs/common';
import { KafkaConsumerModule } from './kafka-consumer/kafka-consumer.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [LogsModule, KafkaConsumerModule],
})
export class AppModule {}
