import { Inject, Logger, forwardRef } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Log, Prisma } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { LogsService } from './logs.service';

@WebSocketGateway({
  namespace: 'logs',
})
export class LogsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => LogsService))
    private logsService: LogsService,
  ) {}

  @WebSocketServer()
  public server: Server;

  private logger: Logger = new Logger('LogsGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getAllLogs')
  async handleGetAllLogs(client: Socket): Promise<void> {
    const logs = await this.logsService.getAllLogs();
    this.logger.log('Sending all logs to client');
    client.emit('allLogs', logs);
  }

  @SubscribeMessage('createLog')
  async handleCreateLog(
    client: Socket,
    log: Prisma.LogCreateInput,
  ): Promise<void> {
    const newLog = await this.logsService.createLog(log);
    this.logger.log('Sending new log to client');
    client.emit('newLog', newLog);
  }

  async handleLogCreated(log: Log): Promise<void> {
    this.logger.log('Sending new log to client');
    this.server.emit('newLog', log);
  }

  async handleLogsCreated(logs: Log[]): Promise<void> {
    this.logger.log('Sending new logs to client');
    this.server.emit('newLogs', logs);
  }
}
