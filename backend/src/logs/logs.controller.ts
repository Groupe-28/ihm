import { Body, Controller, Get, Post } from '@nestjs/common';
import { Log, Prisma } from '@prisma/client';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Post()
  async createLog(@Body() logInsert: Prisma.LogCreateInput): Promise<Log> {
    return this.logsService.createLog({
      ...logInsert,
      content: JSON.stringify(logInsert.content, null, 2),
    });
  }

  @Post('bulk')
  async createLogs(
    @Body() logsInsert: Prisma.LogCreateManyInput,
  ): Promise<Log[]> {
    return this.logsService.createLogs(logsInsert);
  }

  @Get()
  async getAllLogs(): Promise<Log[]> {
    return this.logsService.getAllLogs();
  }
}
