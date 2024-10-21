import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ListErr from 'src/entities/list-err.entity';
import Image from 'src/entities/img-err.entity';
import { CreateListErrDto } from './dto/create-list-err.dto';
import { UpdateListErrDto } from './dto/update-list-err.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ListErrService {
  constructor(
    @InjectRepository(ListErr)
    private listErrRepository: Repository<ListErr>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createListErrDto: CreateListErrDto): Promise<ListErr> {
    const listErr = this.listErrRepository.create(createListErrDto);
    return this.listErrRepository.save(listErr);
  }

  async saveImage(image: Image): Promise<Image> {
    return this.imageRepository.save(image);
  }

  async findAll(): Promise<ListErr[]> {
    return this.listErrRepository.find({ relations: ['images'] });
  }

  async findOne(id: number): Promise<ListErr> {
    return this.listErrRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async update(
    id: number,
    updateListErrDto: UpdateListErrDto,
  ): Promise<ListErr> {
    await this.listErrRepository.update(id, updateListErrDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    // Tìm bản ghi ListErr và các hình ảnh liên quan
    const listErr = await this.findOne(id);

    // Nếu không tìm thấy bản ghi, ném lỗi
    if (!listErr) {
      throw new Error('ListErr not found');
    }

    // Tạo tên thư mục dựa trên id
    const folderId = `img-err/${id}`;

    // Xóa thư mục trên Cloudinary
    await this.cloudinaryService.deleteFolder(folderId); // Thêm phương thức deleteFolder vào CloudinaryService

    // Xóa hình ảnh khỏi cơ sở dữ liệu
    await this.imageRepository.remove(listErr.images);

    // Cuối cùng, xóa bản ghi ListErr
    await this.listErrRepository.delete(id);
  }
}
