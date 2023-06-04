import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MqttModuleService } from './mqtt-module.service';

@Controller('mqtt-module')
export class MqttModuleController {
  constructor(private mqttModuleService: MqttModuleService) {}

  @EventPattern('connection/status')
  public async handleConnectionStatus(data: string) {
    if (data == 'ok') {
      this.mqttModuleService.robotConnectionStatus = true;
      console.log('Robot connected');
    } else {
      this.mqttModuleService.robotConnectionStatus = false;
      console.log('Robot disconnected');
    }
  }

  @Get('status')
  public async getStatus() {
    return await this.mqttModuleService.checkConnectionStatus();
  }
}
