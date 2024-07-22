"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./entities/review.entity");
const typeorm_2 = require("typeorm");
const paginate_1 = require("../../utils/paginate");
let ReviewService = class ReviewService {
    constructor(reviewRepo) {
        this.reviewRepo = reviewRepo;
    }
    async create(createReviewDto, user) {
        const checkReview = await this.reviewRepo.findOneBy({
            userId: user.id,
            productId: createReviewDto.productId,
        });
        if (checkReview)
            throw new common_1.ConflictException('you already reviewed this product');
        return this.reviewRepo.save({ ...createReviewDto, userId: user.id });
    }
    findAll(productId, page, limit) {
        const cq = this.reviewRepo
            .createQueryBuilder('review')
            .where('review.productId = :productId', { productId });
        return (0, paginate_1.paginate)(cq, page, limit);
    }
    async findOne(reviewId) {
        const isExist = await this.reviewRepo.findOneBy({ id: reviewId });
        if (!isExist)
            throw new common_1.NotFoundException('review not found');
        return this.reviewRepo.findOneBy({
            id: reviewId,
        });
    }
    async update(id, updateReviewDto) {
        const review = await this.findOne(id);
        return this.reviewRepo.save({ ...review, ...updateReviewDto });
    }
    async remove(id, user) {
        const review = await this.findOne(id);
        if (user.id !== review.userId)
            throw new common_1.UnauthorizedException();
        return this.reviewRepo.delete({ id });
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map