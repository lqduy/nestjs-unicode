import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsIn,
  IsPositive,
  IsArray,
  ArrayMaxSize,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Category } from 'src/constants/enum';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  @MinLength(5, { message: 'Tên sản phẩm phải có ít nhất 5 ký tự' })
  @MaxLength(50, { message: 'Tên sản phẩm không được vượt quá 50 ký tự' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @MinLength(20, { message: 'Mô tả phải có ít nhất 20 ký tự' })
  @MaxLength(200, { message: 'Mô tả không được vượt quá 200 ký tự' })
  description?: string;

  @IsNotEmpty({ message: 'Giá không được để trống' })
  @IsNumber({}, { message: 'Giá phải là một số' })
  @IsPositive({ message: 'Giá phải là số lớn hơn 0' })
  price: number;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  @IsString({ message: 'Danh mục phải là chuỗi' })
  @IsIn(Object.values(Category), {
    message:
      'Danh mục phải thuộc một trong các giá trị: electronics, furniture, clothing',
  })
  category: Category;

  @IsOptional()
  @IsArray({ message: 'Tags phải là một mảng' })
  @ArrayMaxSize(10, { message: 'Tags không được có nhiều hơn 10 phần tử' })
  @IsString({ each: true, message: 'Mỗi tag phải là chuỗi' })
  @MaxLength(10, {
    each: true,
    message: 'Mỗi tag không được vượt quá 10 ký tự',
  })
  tags?: string[];
}
