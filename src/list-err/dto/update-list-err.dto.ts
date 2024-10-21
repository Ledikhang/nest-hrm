import { PartialType } from '@nestjs/mapped-types';
import { CreateListErrDto } from './create-list-err.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateListErrDto extends PartialType(CreateListErrDto) {
  @IsOptional() // Thuộc tính này có thể không được cung cấp
  @IsString() // Nếu cung cấp, nó phải là một chuỗi
  ma_err?: string;

  @IsOptional()
  @IsString()
  thongbao?: string;

  @IsOptional()
  @IsString()
  nguyennhan?: string;

  @IsOptional()
  @IsString()
  xuly?: string;
}
