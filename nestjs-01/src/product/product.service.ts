import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductModel from 'src/data/product.model';

@Injectable()
export class ProductService {
  constructor(private readonly productModel: ProductModel) {}

  async create(createProductDto: CreateProductDto) {
    const existsProduct = await this.productModel.getById(createProductDto.id);
    if (existsProduct) {
      throw new Error(`Sản phẩm với ID ${createProductDto.id} đã tồn tại`);
    }
    const createdProduct = await this.productModel.create(createProductDto);
    return createdProduct;
  }

  async findAll() {
    const products = await this.productModel.getAll();
    return products;
  }

  async findOne(id: number) {
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
