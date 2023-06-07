import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class MqttModuleService {
  constructor(private logsService: LogsService) {}

  public robotConnectionStatus: boolean = false;

  @Client({
    transport: Transport.MQTT,
    options: { url: 'mqtt://mosquitto:1883' },
  })
  client: ClientProxy;
}
