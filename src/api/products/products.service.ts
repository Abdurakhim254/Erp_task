import { CreateProductDto, ProductsQueryDto, UpdateProductDto } from '@dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity, ProductsRepository } from 'core';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: ProductsRepository,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);

    return await this.productsRepository.save(product);
  }
  async findAll(query: ProductsQueryDto) {
    const products = await this.productsRepository.find({
      where: query,
    });

    return {
      message: 'Products found successfully',
      products,
    };
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product found succesfully',
      product,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const result = await this.productsRepository
      .createQueryBuilder()
      .update()
      .set({
        ...updateProductDto,
        updated_at: new Date(),
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const updatedProduct = result.raw[0];

    return {
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productsRepository.delete(id);
    return {
      message: 'Product deleted successfully',
    };
  }
}
