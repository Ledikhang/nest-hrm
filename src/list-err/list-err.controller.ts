import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ListErrService } from './list-err.service';
import { CreateListErrDto } from './dto/create-list-err.dto';
import { UpdateListErrDto } from './dto/update-list-err.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import Image from 'src/entities/img-err.entity';

@Controller('list-err')
export class ListErrController {
  constructor(
    private readonly listErrService: ListErrService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file')) // Để nhận file từ trường 'file' trong yêu cầu
  async create(
    @Body() createListErrDto: CreateListErrDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const listErr = await this.listErrService.create(createListErrDto);

    if (files && files.length > 0) {
      for (const file of files) {
        const cloudinaryResponse = await this.cloudinaryService.uploadFile(
          file,
          listErr.id,
        );

        const image = new Image();
        image.url = cloudinaryResponse.url;
        image.listErr = listErr; // Thiết lập mối quan hệ với ListErr
        await this.listErrService.saveImage(image);
      }
    }

    return {
      ...listErr,
      images: listErr.images,
    };
  }

  @Get()
  findAll() {
    return this.listErrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listErrService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListErrDto: UpdateListErrDto) {
    return this.listErrService.update(+id, updateListErrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listErrService.remove(+id);
  }
}
