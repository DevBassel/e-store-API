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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const paginate_1 = require("../../utils/paginate");
const categories_service_1 = require("../categories/categories.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ProductsService = class ProductsService {
    constructor(productRepo, categoryService, cloudeService) {
        this.productRepo = productRepo;
        this.categoryService = categoryService;
        this.cloudeService = cloudeService;
    }
    async create(createProductDto, img) {
        const cat = await this.categoryService.findOne(createProductDto.categoryId);
        if (!cat)
            throw new common_1.NotFoundException('category not found');
        const upload = await this.cloudeService.uploadFile(img, {
            folder: 'store/products',
            transformation: [
                { width: '600', height: 600, crop: 'limit' },
                { quality: 'auto:good' },
            ],
        });
        return this.productRepo.save({ ...createProductDto, img: upload.url });
    }
    findAll(page, limit, filter) {
        console.log({ filter });
        const Q = this.productRepo
            .createQueryBuilder('p')
            .andWhere('p.price BETWEEN :min AND :max', {
            min: filter.min,
            max: filter.max,
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
            Q.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('LOWER(p.name) LIKE LOWER(:s)', { s: `%${filter.s}%` });
            }));
        return (0, paginate_1.paginate)(Q, page, limit);
    }
    async findOne(id, categoryId) {
        const product = this.productRepo
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.category', 'cat')
            .leftJoinAndSelect('p.reviews', 'rev')
            .leftJoinAndSelect('rev.user', 'user')
            .loadRelationCountAndMap('p.reviewCount', 'p.reviews');
        id && product.where('p.id = :id', { id });
        categoryId && product.where('cat.id = :categoryId', { categoryId });
        if (!product)
            throw new common_1.NotFoundException('product not found O_o');
        return product
            .select(['p', 'cat', 'rev', 'user.id', 'user.username'])
            .addSelect('COUNT(rev.id)', 'reviewCount')
            .groupBy('p.id')
            .addGroupBy('cat.id')
            .addGroupBy('rev.id')
            .addGroupBy('user.id')
            .getOne();
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        const cat = await this.categoryService.findOne(updateProductDto.categoryId);
        if (!cat)
            throw new common_1.NotFoundException('category not found');
        console.log({ cat, updateProductDto });
        return this.productRepo.save({
            ...product,
            ...updateProductDto,
            category: { ...cat },
        });
    }
    remove(id) {
        return this.productRepo.delete({ id });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        cloudinary_service_1.CloudinaryService])
], ProductsService);
//# sourceMappingURL=products.service.js.map