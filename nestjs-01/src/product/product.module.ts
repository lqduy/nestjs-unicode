import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import ProductModel from 'src/data/product.model';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductModel],
})
export class ProductModule {}
