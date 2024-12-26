import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import {
  IdParamDto,
  UpdateProductDto,
} from 'src/modules/product/dto/update-product.dto';
import { ResponseHandler } from 'src/utils/response-handler';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    const createdProduct = await this.productService.create(body);
    return ResponseHandler.success({
      data: createdProduct,
      statusCode: HttpStatus.CREATED,
      message: 'created product',
    });
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return ResponseHandler.success({ data: products });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    return product;
  }

  @Put(':id')
  async update(@Param() params: IdParamDto, @Body() body: UpdateProductDto) {
    const updatedProduct = await this.productService.update(+params.id, body);
    return ResponseHandler.success({ data: updatedProduct });
  }

  @Delete(':id')
  async remove(@Param() id: string) {
    try {
      await this.productService.remove(+id);
      return ResponseHandler.success({ data: null });
    } catch (error) {
      return error;
    }
  }
}
