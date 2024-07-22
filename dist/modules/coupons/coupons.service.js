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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_entity_1 = require("./entities/coupon.entity");
const typeorm_2 = require("typeorm");
const paginate_1 = require("../../utils/paginate");
let CouponsService = class CouponsService {
    constructor(couponRepo) {
        this.couponRepo = couponRepo;
    }
    async create(createCouponDto) {
        const coupon = await this.couponRepo.findOneBy({
            value: createCouponDto.value,
        });
        if (coupon)
            throw new common_1.ConflictException('this coupon is exist!');
        return this.couponRepo.save(createCouponDto);
    }
    findAll(page, limit) {
        const Q = this.couponRepo.createQueryBuilder('coupon');
        return (0, paginate_1.paginate)(Q, page, limit);
    }
    async findOne(value) {
        const coupon = await this.couponRepo.findOneBy({ value });
        if (!coupon)
            throw new common_1.NotFoundException('coupon not found');
        return coupon;
    }
    async validateCoupon(value) {
        const coupon = await this.findOne(value);
        const creatTime = new Date(coupon.createAt).getTime();
        const calcEnd = creatTime + coupon.validate * 1000 * 60 * 60 * 24;
        const isacrtive = calcEnd > creatTime;
        console.log({ creatTime, calcEnd, isacrtive });
        if (!isacrtive)
            throw new common_1.BadRequestException('not valid coupon');
        return coupon;
    }
    async update(id, updateCouponDto) {
        const coupon = await this.couponRepo.findOneBy({ id });
        if (!coupon)
            throw new common_1.NotFoundException('coupon not found');
        return this.couponRepo.save({ ...coupon, ...updateCouponDto });
    }
    remove(id) {
        return this.couponRepo.delete({ id });
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map