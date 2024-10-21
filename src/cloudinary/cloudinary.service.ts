import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    id: number,
  ): Promise<CloudinaryResponse> {
    try {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `img-err/${id}`, // Đặt tên thư mục theo id
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error);
            }
            console.log('Uploaded Image URL:', result.url);
            return resolve(result);
          },
        );

        const fileStream = Readable.from(file.buffer);
        fileStream.pipe(uploadStream);
      });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  }
  // Thêm phương thức deleteFolder
  async deleteFolder(folderId: string): Promise<void> {
    try {
      // Xóa tất cả tài nguyên trong thư mục
      await cloudinary.api.delete_resources_by_prefix(folderId);
      // Xóa thư mục
      await cloudinary.api.delete_folder(folderId);
      console.log(`Deleted folder: ${folderId}`);
    } catch (error) {
      console.error('Error deleting folder from Cloudinary:', error);
      throw error;
    }
  }
}
