import { Controller, Get } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';

@Controller('kafka-consumer')
export class KafkaConsumerController {
  constructor(private kafkaConsumerService: KafkaConsumerService) {}

  @Get('status')
  async getConnectionStatus(): Promise<{ connected: boolean }> {
    const connected = await this.kafkaConsumerService.checkConnection();
    return { connected };
  }
}
