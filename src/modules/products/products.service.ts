import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brackets, Repository } from 'typeorm';
import { paginate } from 'src/utils/paginate';
import { CategoriesService } from '../categories/categories.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { SelectQueryBuilder } from 'typeorm';
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

  async findAll(
    page: number,
    limit: number,
    filter: {
      category: string;
      min: number;
      max: number;
      s: string;
    },
    userId?: number,
  ) {
    console.log({ filter });

    const Q = this.productRepo
      .createQueryBuilder('p')
      .andWhere('p.price BETWEEN :min AND :max', {
        min: filter.min || 0,
        max: filter.max || 1_000_000,
      })
      .leftJoinAndSelect('p.category', 'cat')
      .leftJoinAndSelect('p.reviews', 'rev')
      .leftJoinAndSelect('rev.user', 'user')
      .loadRelationCountAndMap('p.reviewsCount', 'p.reviews')
      .select(['p', 'cat', 'user.id', 'user.username', 'COUNT(rev.id)'])
      .groupBy('p.id')
      .addGroupBy('cat.id')
      .addGroupBy('rev.id')
      .addGroupBy('user.id');

    filter.category &&
      Q.andWhere(`cat.name = :c`, {
        c: filter.category,
      });

    filter.s &&
      Q.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(p.name) LIKE LOWER(:s)', { s: `%${filter.s}%` });
        }),
      );

    return userId
      ? this.getProductsWithIsFav(Q, userId, page, limit)
      : paginate(Q, page, limit);
  }

  async findOne(id?: number, categoryId?: number, userId?: number) {
    const Q = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'cat')
      .leftJoinAndSelect('p.reviews', 'rev')
      .leftJoinAndSelect('rev.user', 'user')
      .groupBy('p.id')
      .addGroupBy('cat.id')
      .addGroupBy('rev.id')
      .addGroupBy('user.id')
      .select(['p', 'cat', 'rev', 'user.id', 'user.username']);

    if (id) Q.andWhere('p.id = :id', { id });
    if (categoryId) Q.andWhere('cat.id = :categoryId', { categoryId });

    return userId ? this.getProductWithIsFav(Q, userId) : Q.getOne();
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

  private async getProductsWithIsFav(
    Q: SelectQueryBuilder<Product>,
    userId: number,
    page: number,
    limit: number,
  ) {
    Q.skip((page - 1) * limit).take(limit);
    Q.leftJoin('p.favourites', 'f')
      .addSelect(`MAX(CASE WHEN f.userId = :userId THEN 1 ELSE 0 END)`, 'isFav')
      .setParameter('userId', userId)
      .addGroupBy('p.id');
    const total = await Q.getCount(); // separate count, before raw select changes grouping semantics further

    const { entities, raw } = await Q.getRawAndEntities();

    const data = entities.map((post, i) => ({
      ...post,
      ...(userId ? { isFav: Boolean(Number(raw[i]?.isFav)) } : {}),
    }));

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }
  private async getProductWithIsFav(
    Q: SelectQueryBuilder<Product>,
    userId: number,
  ) {
    Q.leftJoin('p.favourites', 'f')
      .addSelect(`MAX(CASE WHEN f.userId = :userId THEN 1 ELSE 0 END)`, 'isFav')
      .setParameter('userId', userId)
      .addGroupBy('f.id');

    const { entities, raw } = await Q.getRawAndEntities();
    const entity = entities[0];

    if (!entity) throw new NotFoundException('product not found');

    return {
      ...entity,
      reviewsCount: entity.reviews?.length ?? 0,
      ...(userId ? { isFav: !!raw[0]?.isFav } : {}),
    };
  }
}
