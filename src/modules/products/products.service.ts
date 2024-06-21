import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    return paginate(
      this.productRepo
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.category', 'c'),
      page,
      limit,
    );
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('product not found O_o');
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    return this.productRepo.save({ ...product, ...updateProductDto });
  }

  remove(id: number) {
    return this.productRepo.delete({ id });
  }
}
