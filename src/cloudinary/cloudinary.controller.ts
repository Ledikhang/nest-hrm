import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('image')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: number, // Lấy id từ body của yêu cầu
  ) {
    console.log('Uploaded file:', file); // Kiểm tra giá trị file
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!id) {
      throw new BadRequestException('No ID provided');
    }

    return this.cloudinaryService.uploadFile(file, id); // Truyền file và id vào phương thức upload
  }
}
