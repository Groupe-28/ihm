import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MqttModuleService } from './mqtt-module.service';

@Controller('mqtt-module')
export class MqttModuleController {
  constructor(private mqttModuleService: MqttModuleService) {}

  @EventPattern('connection/status')
  public async handleConnectionStatus(data: string) {
    switch (data) {
      case 'connected':
        this.mqttModuleService.robotConnectionStatus = true;
        break;
      case 'disconnected':
        this.mqttModuleService.robotConnectionStatus = false;
        break;
    }
  }

  @Get('status')
  public async getStatus() {
    return await this.mqttModuleService.robotConnectionStatus;
  }
}
