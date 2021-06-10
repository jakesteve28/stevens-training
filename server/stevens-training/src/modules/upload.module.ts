import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaUpload } from 'src/entities/media-upload.entity';
import { UploadController } from '../controllers/upload.controller';
import { UploadService } from '../providers/upload-file.service';
import { UserModule } from './user.module';
import { PlaceModule } from './place.module';
import { ExerciseModule } from './exercise.module';
import { WorkoutModule } from './workout.module';
import { StoryService } from '../providers/story.service';
import { Story } from '../entities/story.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MediaUpload, Story]), UserModule, PlaceModule, ExerciseModule, WorkoutModule],
  controllers: [UploadController],
  providers: [UploadService, StoryService],
  exports: [UploadService],
})
export class UploadModule {}