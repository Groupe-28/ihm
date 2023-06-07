import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import GPS from 'gps';
import { GeoGateway } from 'src/geo/geo.gateway';
import { MqttModuleService } from './mqtt-module.service';

@Controller('mqtt-module')
export class MqttModuleController {
  constructor(
    private mqttModuleService: MqttModuleService,
    private readonly geoGateway: GeoGateway,
  ) {}

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
        this.mqttModuleService.logger.log('connected');
        this.mqttModuleService.robotConnectionStatus = true;
        break;
      case 'disconnected':
        this.mqttModuleService.logger.warn('disconnected');
        this.geoGateway.sendErrorMessage('Robot is not connected');
        this.mqttModuleService.robotConnectionStatus = false;
        break;
    }
  }

  @MessagePattern('gps/data')
  public async handleGpsData(
    @Payload() data: string,
    @Ctx() context: MqttContext,
  ) {
    if (context.getPacket().retain) {
      return;
    }

    const parsedData = GPS.Parse(data);

    // Extract latitude and longitude from parsed data
    const latitude = parsedData.lat;
    const longitude = parsedData.lon;

    if (latitude && longitude) {
      this.geoGateway.sendLocalizationData({
        longitude,
        latitude,
      });
    }
  }

  @Get('status')
  public async getStatus() {
    return this.mqttModuleService.robotConnectionStatus;
  }
}
