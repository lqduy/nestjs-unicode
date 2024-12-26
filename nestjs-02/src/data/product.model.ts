import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { Product } from 'src/schemas/product';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { APIError } from 'src/utils/api-error';

@Injectable()
class ProductModel {
  private readonly dbPath = join(process.cwd(), '/src/data/products.json');

  private readonly readonlyField = ['id'];

  private async readDataProducts(): Promise<{ products: Product[] }> {
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
      throw new APIError(`Không thể đọc file products.json: ${error.message}`);
    }
  }

  private async writeDataProducts(products: Product[]): Promise<void> {
    try {
      console.log(`Writing products to: ${this.dbPath}`);
      const db = JSON.stringify(products, null, 2);
      await writeFile(this.dbPath, db, 'utf-8');
    } catch (error) {
      console.error(`Error writing file: ${error.message}`);
      throw new APIError(
        `Không thể ghi vào file products.json: ${error.message}`,
      );
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
    const updateProduct = products.find((p) => p.id === id);

    if (!updateProduct) {
      throw new APIError(`Không tìm thấy sản phẩm với ID ${id}`);
    }

    Object.keys(product).forEach((key) => {
      if (updateProduct[key] && !this.readonlyField.includes(key)) {
        updateProduct[key] = product[key];
      }
    });

    await this.writeDataProducts(products);
    const updatedProduct = await this.getById(id);
    return updatedProduct;
  }

  async delete(id: number): Promise<Product | undefined> {
    const { products } = await this.readDataProducts();
    const productToDelete = products.find((p) => p.id === id);

    if (!productToDelete) {
      throw new APIError(`Không tìm thấy sản phẩm với ID ${id}`);
    }

    const newProducts = products.filter((p) => p.id !== id);
    await this.writeDataProducts(newProducts);
    return productToDelete;
  }
}

export default ProductModel;
