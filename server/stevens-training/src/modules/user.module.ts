import { forwardRef, Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../providers/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriber } from '../providers/subscribers/user.subscriber';
import { MediaUpload } from '../entities/media-upload.entity';
import { Story } from '../entities/story.entity';
import { AppModule } from './app.module';
import { SignOnModule } from './signon.module';
import { StoryService } from '../providers/story.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, MediaUpload, Story]), forwardRef(() => SignOnModule)],
    providers: [UserService, UserSubscriber, StoryService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
    
