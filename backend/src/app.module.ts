import { Module } from '@nestjs/common';
import { GeoModule } from './geo/geo.module';
import { KafkaConsumerModule } from './kafka-consumer/kafka-consumer.module';
import { LogsModule } from './logs/logs.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [LogsModule, KafkaConsumerModule, GeoModule],
  providers: [PrismaService],
})
export class AppModule {}
