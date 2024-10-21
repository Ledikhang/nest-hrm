import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Image from './img-err.entity';

@Entity()
@Index(['id', 'ma_err', 'thongbao', 'nguyennhan', 'xuly'])
class ListErr {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public ma_err: string;

  @Column()
  public thongbao: string;

  @Column()
  public nguyennhan: string;

  @Column()
  public xuly: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Image, (image) => image.listErr, { cascade: true }) // Mối quan hệ một danh sách có nhiều hình ảnh
  public images: Image[]; // Danh sách các hình ảnh liên quan
}

export default ListErr;
