import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator
      ) {}
    
      @Get()
      @HealthCheck()
      check() {
        return this.health.check([
          () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
          () => this.db.pingCheck('database'),
        ]);
      }
}
