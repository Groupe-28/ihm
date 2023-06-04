import { Module } from '@nestjs/common';

import { LogsModule } from 'src/logs/logs.module';
import { MqttModuleController } from './mqtt-module.controller';
import { MqttModuleService } from './mqtt-module.service';

@Module({
  imports: [LogsModule],
  controllers: [MqttModuleController],
  providers: [MqttModuleService],
  exports: [MqttModuleService],
})
export class MqttModuleModule {}
