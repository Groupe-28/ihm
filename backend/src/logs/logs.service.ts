import { Injectable } from '@nestjs/common';
import { Log, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LogsGateway } from './logs.gateway';

@Injectable()
export class LogsService {
  constructor(
    private prisma: PrismaService,
    private logsGateway: LogsGateway,
  ) {}

  async createLog(data: Prisma.LogCreateInput): Promise<Log> {
    const log = await this.prisma.log.create({ data });
    this.logsGateway.handleLogCreated(log); // Trigger the event in the gateway
    return log;
  }

  async createLogs(data: Prisma.LogCreateManyInput): Promise<Log[]> {
    await this.prisma.log.createMany({ data });
    const logs = await this.prisma.log.findMany();
    this.logsGateway.handleLogsCreated(logs); // Trigger the event in the gateway
    return logs;
  }

  async getAllLogs(): Promise<Log[]> {
    return this.prisma.log.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Implement other CRUD methods as needed
}
