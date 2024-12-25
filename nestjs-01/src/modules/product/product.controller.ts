import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
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
  async create(@Body() body: CreateProductDto, @Res() res: Response) {
    const createdProduct = await this.productService.create(body);
    return ResponseHandler.success({
      res,
      data: createdProduct,
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productService.findAll();
    return ResponseHandler.success({ res, data: products });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productService.findOne(+id);
    return ResponseHandler.success({ res, data: product });
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateProductDto,
    @Res() res: Response,
  ) {
    const updatedProduct = await this.productService.update(+params.id, body);
    return ResponseHandler.success({ res, data: updatedProduct });
  }

  @Delete(':id')
  async remove(@Param() id: string, @Res() res: Response) {
    try {
      await this.productService.remove(+id);
      return ResponseHandler.success({ res, data: null });
    } catch (error) {
      return ResponseHandler.error({
        res,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
