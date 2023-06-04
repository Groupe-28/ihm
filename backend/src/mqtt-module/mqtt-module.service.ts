import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
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

  async publishMessage(topic: string, message: string): Promise<void> {
    try {
      await firstValueFrom(this.client.emit(topic, message));
    } catch (error) {
      Logger.error(error);
      this.logsService.createLog({
        title: 'MQTT Module',
        content: JSON.stringify(
          new Object({
            topic: topic,
            message: message,
            error: error,
          }),
        ),
      });
    }
  }

  async checkConnectionStatus() {
    await this.publishMessage('connection/status', 'request');
    return this.robotConnectionStatus;
  }
}
