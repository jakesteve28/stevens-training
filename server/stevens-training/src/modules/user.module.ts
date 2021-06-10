import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../providers/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriber } from '../providers/subscribers/user.subscriber';
import { MediaUpload } from '../entities/media-upload.entity';
import { Story } from '../entities/story.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, MediaUpload, Story])],
    providers: [UserService, UserSubscriber],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
    
