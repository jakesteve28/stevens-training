import { forwardRef, Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../providers/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriber } from '../providers/subscribers/user.subscriber';
import { MediaUpload } from '../entities/media-upload.entity';
import { Story } from '../entities/story.entity';
import { SignOnModule } from './signon.module';
import { StoryService } from '../providers/story.service';
import { MessageService } from '../providers/message.service';
import { WorkoutModule } from './workout.module';
import { Message } from '../entities/message.entity';
import { PlaceModule } from './place.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, MediaUpload, Story, Message]), forwardRef(() => SignOnModule), forwardRef(() => WorkoutModule), forwardRef(() => PlaceModule)
],
    providers: [UserService, UserSubscriber, StoryService, MessageService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
    
