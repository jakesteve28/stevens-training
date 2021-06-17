import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheck, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator
      ) {}

      private readonly logger = new Logger(HealthController.name);
    
      @Get()
      @HealthCheck()
      check() {
        this.logger.log(`Health check running`);
        return this.health.check([
          () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
          () => this.db.pingCheck('database'),
        ]);
      }
}
