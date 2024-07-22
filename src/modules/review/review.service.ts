import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      productId: createReviewDto.productId,
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

  async findOne(reviewId: number) {
    const isExist = await this.reviewRepo.findOneBy({ id: reviewId });

    if (!isExist) throw new NotFoundException('review not found');
    return this.reviewRepo.findOneBy({
      id: reviewId,
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);
    return this.reviewRepo.save({ ...review, ...updateReviewDto });
  }

  async remove(id: number, user: JwtPayload) {
    const review = await this.findOne(id);

    if (user.id !== review.userId) throw new UnauthorizedException();

    return this.reviewRepo.delete({ id });
  }
}
