import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../providers/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriber } from '../providers/subscribers/user.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserSubscriber],
    controllers: [UserController],
    exports: []
})
export class UserModule {}
    
