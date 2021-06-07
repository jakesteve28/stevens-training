import { UploadedFile } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {

    constructor() {}

    @Post('story')
    @UseInterceptors(FileInterceptor('file'))
    async uploadStoryMedia(@UploadedFile() file: Express.Multer.File) {
        console.info(file);
    }
    @Post('workout')
    @UseInterceptors(FileInterceptor('file'))
    async uploadWorkoutMedia(@UploadedFile() file: Express.Multer.File) {
        console.info(file);
    }
    @Post('place')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPlaceMedia(@UploadedFile() file: Express.Multer.File) {
        console.info(file);
    }
}