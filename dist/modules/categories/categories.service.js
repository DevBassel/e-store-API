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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
let CategoriesService = class CategoriesService {
    constructor(categoryRepo, productService) {
        this.categoryRepo = categoryRepo;
        this.productService = productService;
    }
    create(createCategoryDto) {
        return this.categoryRepo.save(createCategoryDto);
    }
    findAll() {
        return this.categoryRepo.find();
    }
    findOne(id) {
        return this.categoryRepo.findOneBy({ id });
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        if (!category)
            throw new common_1.NotFoundException('category not found');
        return this.categoryRepo.save({ ...category, ...updateCategoryDto });
    }
    async remove(id) {
        const isFound = await this.productService.findOne(null, id);
        if (isFound)
            throw new common_1.ConflictException('This category cannot be deleted because it is linked with some products ');
        return this.categoryRepo.delete({ id });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map