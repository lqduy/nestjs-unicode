import { Module } from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';
import { ProductController } from 'src/modules/product/product.controller';
import ProductModel from 'src/data/product.model';
import { ProductExisting } from 'src/rules/product-existing.rule';
import { ResponseHandler } from 'src/utils/response-handler';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductModel, ProductExisting, ResponseHandler],
})
export class ProductModule {}
