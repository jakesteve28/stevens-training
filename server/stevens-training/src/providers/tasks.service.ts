import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression  } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Health check and testing task called every 90 seconds. Initiating tests.');
  }
}