import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import ListErr from './list-err.entity'; // Đảm bảo import đúng path

@Entity()
@Index(['id', 'url'])
class Image {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string; // Sử dụng 'url' cho trường chứa đường dẫn đến hình ảnh

  @ManyToOne(() => ListErr, (listErr) => listErr.images) // Mối quan hệ nhiều hình ảnh đến một danh sách
  public listErr: ListErr; // Khóa ngoại đến ListErr
}

export default Image;
