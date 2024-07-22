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
exports.FavouriteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const favourite_entity_1 = require("./entities/favourite.entity");
const typeorm_2 = require("typeorm");
let FavouriteService = class FavouriteService {
    constructor(favRepo) {
        this.favRepo = favRepo;
    }
    async create(createFavouriteDto, user) {
        const fav = await this.favRepo.findOneBy({
            productId: createFavouriteDto.productId,
        });
        if (fav)
            throw new common_1.ConflictException('this favourite alrady exist O_o');
        return this.favRepo.save({ ...createFavouriteDto, userId: user.id });
    }
    findAll(user) {
        return this.favRepo.findBy({ userId: user.id });
    }
    async findOne(id) {
        const fav = await this.favRepo.findOne({
            where: { id },
            relations: {
                product: { category: true },
            },
        });
        if (!fav)
            throw new common_1.NotFoundException();
        return fav;
    }
    async remove(id, user) {
        const fav = await this.findOne(id);
        if (fav.userId !== user.id)
            throw new common_1.UnauthorizedException();
        return this.favRepo.delete({ id });
    }
};
exports.FavouriteService = FavouriteService;
exports.FavouriteService = FavouriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favourite_entity_1.Favourite)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavouriteService);
//# sourceMappingURL=favourite.service.js.map