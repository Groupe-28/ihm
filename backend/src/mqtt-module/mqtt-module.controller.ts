import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { MqttModuleService } from './mqtt-module.service';

@Controller('mqtt-module')
export class MqttModuleController {
  constructor(private mqttModuleService: MqttModuleService) {}

  @MessagePattern('connection/status')
  public async handleConnectionStatus(
    @Payload() data: string,
    @Ctx() context: MqttContext,
  ) {
    if (context.getPacket().retain) {
      return;
    }
    switch (data) {
      case 'connected':
        console.log('connected');
        this.mqttModuleService.robotConnectionStatus = true;
        break;
      case 'disconnected':
        console.log('disconnected');
        this.mqttModuleService.robotConnectionStatus = false;
        break;
    }
  }

  @Get('status')
  public async getStatus() {
    return this.mqttModuleService.robotConnectionStatus;
  }
}
