import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import {
  IdParamDto,
  UpdateProductDto,
} from 'src/modules/product/dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param() params: IdParamDto, @Body() body: UpdateProductDto) {
    return this.productService.update(+params.id, body);
  }

  @Delete(':id')
  remove(@Param() id: string) {
    return this.productService.remove(+id);
  }
}
