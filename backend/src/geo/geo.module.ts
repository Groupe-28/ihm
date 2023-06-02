import { Module } from '@nestjs/common';
import { LogsModule } from 'src/logs/logs.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeoController } from './geo.controller';
import { GeoService } from './geo.service';

@Module({
  imports: [LogsModule],
  providers: [GeoService, PrismaService],
  controllers: [GeoController],
})
export class GeoModule {}
