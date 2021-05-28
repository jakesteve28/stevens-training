import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../providers/admin.service';

const config = {
  isGlobal: true,
  cache: true,
  expandVariables: true,
  envFilePath: (process.env.NODE_ENV === 'production') ? '.prod.env' : '.dev.env'
}

@Module({
  imports: [ConfigModule.forRoot(config)],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
