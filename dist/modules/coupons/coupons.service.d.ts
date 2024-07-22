import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
export declare class CouponsService {
    private readonly couponRepo;
    constructor(couponRepo: Repository<Coupon>);
    create(createCouponDto: CreateCouponDto): Promise<CreateCouponDto & Coupon>;
    findAll(page: number, limit: number): Promise<{
        data: Coupon[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(value: string): Promise<Coupon>;
    validateCoupon(value: string): Promise<Coupon>;
    update(id: number, updateCouponDto: UpdateCouponDto): Promise<{
        value: string;
        discount: number;
        validate: number;
        id: number;
        uuid: string;
        createAt: Date;
    } & Coupon>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
