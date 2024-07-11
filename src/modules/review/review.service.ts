import { ConflictException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
  ) {}
  async create(createReviewDto: CreateReviewDto, user: JwtPayload) {
    const checkReview = await this.reviewRepo.findOneBy({
      userId: user.id,
    });

    if (checkReview)
      throw new ConflictException('you already reviewed this product');

    return this.reviewRepo.save({ ...createReviewDto, userId: user.id });
  }

  findAll(productId: number, page: number, limit: number) {
    const cq = this.reviewRepo
      .createQueryBuilder('review')
      .where('review.productId = :productId', { productId });
    return paginate(cq, page, limit);
  }

  findOne(productId: number) {
    return this.reviewRepo.findOneBy({
      productId,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
