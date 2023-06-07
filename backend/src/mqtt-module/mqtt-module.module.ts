import { Module } from '@nestjs/common';

import { GeoGateway } from 'src/geo/geo.gateway';
import { LogsModule } from 'src/logs/logs.module';
import { MqttModuleController } from './mqtt-module.controller';
import { MqttModuleService } from './mqtt-module.service';

@Module({
  imports: [LogsModule],
  controllers: [MqttModuleController],
  providers: [MqttModuleService, GeoGateway],
  exports: [MqttModuleService],
})
export class MqttModuleModule {}
