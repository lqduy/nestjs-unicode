import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class ProductExisting implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {}

  async validate(id: string): Promise<boolean> {
    const productId = Number(id);
    if (isNaN(productId)) {
      return false;
    }

    const existingProduct = await this.productService.findOne(productId);
    return Boolean(existingProduct);
  }
}
