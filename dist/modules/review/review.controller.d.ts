import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(createReviewDto: CreateReviewDto, req: Request & {
        user: JwtPayload;
    }): Promise<{
        userId: number;
        productId: number;
        rating: number;
        content: string;
    } & import("./entities/review.entity").Review>;
    findAll(productId: number, page: number, limit: number): Promise<{
        data: import("./entities/review.entity").Review[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/review.entity").Review>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<{
        productId: number;
        rating: number;
        content: string;
        id: number;
        userId: number;
        product: import("../products/entities/product.entity").Product;
        user: import("../user/entities/user.entity").User;
        createdAt: Date;
        updatedAt: Date;
    } & import("./entities/review.entity").Review>;
    remove(id: string, req: Request & {
        user: JwtPayload;
    }): Promise<import("typeorm").DeleteResult>;
}
