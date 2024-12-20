import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { Product } from '../schemas/product';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { UpdateProductDto } from '../product/dto/update-product.dto';

@Injectable()
class ProductModel {
  private readonly dbPath = join(process.cwd(), '/src/data/products.json');

  private async readDataProducts(): Promise<{ products: Product[] }> {
    console.log(this.dbPath);
    try {
      if (!existsSync(this.dbPath)) {
        console.log(`File does not exist. Creating new file: ${this.dbPath}`);
        await this.writeDataProducts([]);
      }
      const data = await readFile(this.dbPath, 'utf-8');
      const products = data.trim() ? JSON.parse(data) : [];
      return { products };
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      throw new Error(`Không thể đọc file products.json: ${error.message}`);
    }
  }

  private async writeDataProducts(products: Product[]): Promise<void> {
    try {
      console.log(`Writing products to: ${this.dbPath}`);
      const db = JSON.stringify(products, null, 2);
      await writeFile(this.dbPath, db, 'utf-8');
    } catch (error) {
      console.error(`Error writing file: ${error.message}`);
      throw new Error(`Không thể ghi vào file products.json: ${error.message}`);
    }
  }

  async getAll(): Promise<Product[]> {
    const { products } = await this.readDataProducts();
    return products;
  }

  async getById(id: number): Promise<Product | undefined> {
    const { products } = await this.readDataProducts();
    return products.find((product) => product.id === id);
  }

  async create(product: Product): Promise<Product> {
    const { products } = await this.readDataProducts();
    const newProducts = [...products, product];
    await this.writeDataProducts(newProducts);
    return product;
  }

  async update(
    id: number,
    product: UpdateProductDto,
  ): Promise<Product | undefined> {
    const { products } = await this.readDataProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${id}`);
    }

    products[index] = {
      id: product.id,
      description: product.description,
      name: product.name,
      price: product.price,
    };
    await this.writeDataProducts(products);
    const updatedProduct = await this.getById(id);
    return updatedProduct;
  }

  async delete(id: number): Promise<Product | undefined> {
    const { products } = await this.readDataProducts();
    const productToDelete = products.find((p) => p.id === id);

    if (!productToDelete) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${id}`);
    }

    const newProducts = products.filter((p) => p.id !== id);
    await this.writeDataProducts(newProducts);
    return productToDelete;
  }
}

export default ProductModel;
