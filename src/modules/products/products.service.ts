import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { paginate } from 'src/utils/paginate';
import { CategoriesService } from '../categories/categories.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly categoryService: CategoriesService,
    private readonly cloudeService: CloudinaryService,
  ) {}
  async create(createProductDto: CreateProductDto, img: Express.Multer.File) {
    const cat = await this.categoryService.findOne(createProductDto.categoryId);
    if (!cat) throw new NotFoundException('category not found');
    const upload = await this.cloudeService.uploadFile(img, {
      folder: 'store/products',
      transformation: [
        { width: '600', height: 600, crop: 'limit' },
        { quality: 'auto:good' },
      ],
    });
    return this.productRepo.save({ ...createProductDto, img: upload.url });
  }

  findAll(
    page: number,
    limit: number,
    filter: {
      category: string;
      min: number;
      max: number;
    },
  ) {
    if (filter.category !== 'all') {
      return paginate(
        this.productRepo
          .createQueryBuilder('p')
          .leftJoinAndSelect('p.category', 'c')
          .where('c.name = :name', { name: filter.category })
          .andWhere('p.price BETWEEN :min AND :max', {
            min: filter.min,
            max: filter.max,
          }),
        page,
        limit,
      );
    } else {
      return paginate(
        this.productRepo
          .createQueryBuilder('p')
          .leftJoinAndSelect('p.category', 'c')
          .where('p.price BETWEEN :min AND :max', {
            min: filter.min,
            max: filter.max,
          }),
        page,
        limit,
      );
    }
  }

  async findOne(id?: number, categoryId?: number) {
    const product = await this.productRepo.findOne({
      where: [{ id }, { categoryId }],
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('product not found O_o');
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    const cat = await this.categoryService.findOne(updateProductDto.categoryId);

    if (!cat) throw new NotFoundException('category not found');
    console.log({ cat, updateProductDto });

    return this.productRepo.save({
      ...product,
      ...updateProductDto,
      category: { ...cat },
    });
  }

  remove(id: number) {
    return this.productRepo.delete({ id });
  }
}
