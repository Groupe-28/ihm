import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogsController } from './logs.controller';
import { LogsGateway } from './logs.gateway';
import { LogsService } from './logs.service';

@Module({
  providers: [LogsGateway, LogsService, PrismaService, LogsGateway],
  controllers: [LogsController],
  exports: [LogsService],
})
export class LogsModule {}
