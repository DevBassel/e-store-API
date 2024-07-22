import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/dto/jwt-payload';
export declare class ReviewService {
    private readonly reviewRepo;
    constructor(reviewRepo: Repository<Review>);
    create(createReviewDto: CreateReviewDto, user: JwtPayload): Promise<{
        userId: number;
        productId: number;
        rating: number;
        content: string;
    } & Review>;
    findAll(productId: number, page: number, limit: number): Promise<{
        data: Review[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(reviewId: number): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<{
        productId: number;
        rating: number;
        content: string;
        id: number;
        userId: number;
        product: import("../products/entities/product.entity").Product;
        user: import("../user/entities/user.entity").User;
        createdAt: Date;
        updatedAt: Date;
    } & Review>;
    remove(id: number, user: JwtPayload): Promise<import("typeorm").DeleteResult>;
}
