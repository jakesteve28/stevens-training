import { Delete, Param, Req, UploadedFile, UseGuards } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { UserService } from "../providers/user.service";
import { MediaUpload, UploadType } from "../entities/media-upload.entity";
import { User } from "../entities/user.entity";
import JwtRefreshAuthGuard from "../guards/jwt-refresh.auth-guard";

@Controller('upload')
@UseGuards(new JwtRefreshAuthGuard())
export class UploadController {
    constructor(private userService: UserService) {}

    private async newUpload(user: User, uploadType: UploadType, file: Express.Multer.File): Promise<MediaUpload> {
        
        return null;
    }

    private async rmUpload(path: string): Promise<void> {

        return null;
    }

    @Post('story')
    @UseInterceptors(FileInterceptor('file'))
    async uploadStoryMedia(@Req() req, @UploadedFile() file: Express.Multer.File) {
        console.info("Uploading new story media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.newUpload(user, UploadType.Story, file);
        user.story.uploads.push(upload); 
        
        return upload; 
    }
    @Post('workout')
    @UseInterceptors(FileInterceptor('file'))
    async uploadWorkoutMedia(@Req() req, @UploadedFile() file: Express.Multer.File) {
        console.info("Uploading new workout media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.newUpload(user, UploadType.Workout, file);
        return upload; 
    }
    @Post('place')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPlaceMedia(@Req() req, @UploadedFile() file: Express.Multer.File) {
        console.info("Uploading new place media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.newUpload(user, UploadType.Place, file);
        return upload; 
    }
    @Post('exercise')
    @UseInterceptors(FileInterceptor('file'))
    async uploadExerciseMedia(@Req() req, @UploadedFile() file: Express.Multer.File) {
        console.info("Uploading new exercise media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.newUpload(user, UploadType.Exercise, file);
        return upload; 
    }
    @Post('profile')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicMedia(@Req() req, @UploadedFile() file: Express.Multer.File) {
        console.info("Uploading new profile pic media", file);
        const user = await this.userService.findOne(req.user?.id);
        const upload = await this.newUpload(user, UploadType.ProfilePic, file);
        return upload; 
    }
    @Delete('/:userId/:id')
    async deleteUpload(@Param('userId') userId: string, @Param('id') uploadId: string) {
        console.info("Deleting media", userId, uploadId);
        await this.rmUpload(`${userId}/${uploadId}`);
        return "Success";  
    }
}