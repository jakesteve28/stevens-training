import { Delete, forwardRef, Inject, Param, Req, UploadedFile, UseGuards } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from "../providers/user.service";
import { MediaUpload, UploadType } from "../entities/media-upload.entity";
import JwtRefreshAuthGuard from "../guards/jwt-refresh.auth-guard";
import { StoryService}  from "../providers/story.service";
import { WorkoutService } from "../providers/workout.service";
import { PlaceService } from "../providers/place.service";
import { ExerciseService } from "../providers/exercise.service";
import { Story } from "../entities/story.entity";
import { Workout } from "../entities/workout.entity";
import { Place } from "../entities/place.entity";
import { Exercise } from "../entities/exercise.entity";
import { UploadService } from "../providers/upload-file.service";

@Controller('upload')
@UseGuards(new JwtRefreshAuthGuard())
export class UploadController {
    constructor(
                @Inject(forwardRef(() => UserService))
                private userService: UserService,
                @Inject(forwardRef(() => StoryService))
                private storyService: StoryService, 
                @Inject(forwardRef(() => WorkoutService))
                private workoutService: WorkoutService, 
                @Inject(forwardRef(() => PlaceService))
                private placeService: PlaceService, 
                @Inject(forwardRef(() => ExerciseService))
                private exerciseService: ExerciseService, 
                private uploadService: UploadService
        ) {}

    @Post('story')
    @UseInterceptors(FileInterceptor('file'))
    async uploadStoryMedia(@Req() req, @UploadedFile() file: Express.Multer.File): Promise<{upload: MediaUpload, story: Story}> {
        console.info("Uploading new story media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.uploadService.newUpload(user, UploadType.Story, file);
        const _story = await this.storyService.addUpload(user.story.id, upload.id);      
        return { upload: upload, story: _story }; 
    }
    @Post('workout/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadWorkoutMedia(@Req() req, @Param('id') workoutId: string, @UploadedFile() file: Express.Multer.File): Promise<{upload: MediaUpload, workout: Workout}> {
        console.info("Uploading new workout media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.uploadService.newUpload(user, UploadType.Workout, file);
        const workout = await this.workoutService.addUpload(workoutId, upload.id); 
        return { upload: upload, workout: workout }; 
    }
    @Post('place/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPlaceMedia(@Req() req, @Param('id') placeId: string, @UploadedFile() file: Express.Multer.File): Promise<{ upload: MediaUpload, place: Place }> {
        console.info("Uploading new place media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.uploadService.newUpload(user, UploadType.Place, file);
        const place = await this.placeService.addUpload(placeId, upload.id);
        return { upload: upload, place: place }; 
    }
    @Post('exercise/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadExerciseMedia(@Req() req, @Param('id') exerciseId: string, @UploadedFile() file: Express.Multer.File): Promise<{ upload: MediaUpload, exercise: Exercise }> {
        console.info("Uploading new exercise media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.uploadService.newUpload(user, UploadType.Exercise, file);
        const exercise = await this.exerciseService.addUpload(exerciseId, upload.id); 
        return { upload: upload, exercise: exercise }; 
    }
    @Post('profile')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicMedia(@Req() req, @UploadedFile() file: Express.Multer.File) {
        console.info("Uploading new profile media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.uploadService.newUpload(user, UploadType.Story, file);
        const _user = await this.userService.addUpload(user.id, upload.id);      
        return { upload: upload, user: _user }; 
    }
    @Delete('/:userId/:id')
    async deleteUpload(@Param('userId') userId: string, @Param('id') uploadId: string) {
        console.info("Deleting media", userId, uploadId);
        await this.uploadService.rmUpload(userId, uploadId);
        return "Success";  
    }
}