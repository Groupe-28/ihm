import { Module } from '@nestjs/common';
import { GeoModule } from './geo/geo.module';
import { LogsModule } from './logs/logs.module';
import { MqttModuleModule } from './mqtt-module/mqtt-module.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [LogsModule, GeoModule, MqttModuleModule],
  providers: [PrismaService],
  controllers: [],
})
export class AppModule {}
