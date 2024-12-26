import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumberString, Validate } from 'class-validator';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { ProductExisting } from 'src/rules/product-existing.rule';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class IdParamDto {
  @IsNotEmpty({ message: 'ID không được để trống' })
  @IsNumberString({}, { message: 'ID phải là một số hợp lệ' })
  @Validate(ProductExisting, { message: 'Sản phẩm không tồn tại' })
  id: string;
}
