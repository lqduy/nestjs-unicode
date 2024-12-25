import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductModel from 'src/data/product.model';
import { Product } from 'src/schemas/product';

@Injectable()
export class ProductService {
  constructor(private readonly productModel: ProductModel) {}

  async create(createProductDto: CreateProductDto) {
    const createProduct: Product = {
      ...createProductDto,
      id: new Date().getTime(),
    };

    try {
      const createdProduct = await this.productModel.create(createProduct);
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const products = await this.productModel.getAll();
    return products;
  }

  public async findOne(id: number) {
    const product = await this.productModel.getById(id);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productModel.getById(id);
    if (!updateProduct) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${id}`);
    }
    const updatedProduct = await this.productModel.update(id, updateProductDto);
    return updatedProduct;
  }

  async remove(id: number) {
    const deleteProduct = await this.productModel.getById(id);
    if (!deleteProduct) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${id}`);
    }
    const product = await this.productModel.delete(id);
    return product;
  }
}
