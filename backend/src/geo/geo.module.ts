import { Module } from '@nestjs/common';
import { LogsModule } from 'src/logs/logs.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeoController } from './geo.controller';
import { GeoGateway } from './geo.gateway';
import { GeoService } from './geo.service';

@Module({
  imports: [LogsModule],
  providers: [GeoService, PrismaService, GeoGateway],
  controllers: [GeoController],
  exports: [GeoGateway],
})
export class GeoModule {}
