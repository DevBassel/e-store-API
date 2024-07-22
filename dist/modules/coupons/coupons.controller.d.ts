import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<CreateCouponDto & import("./entities/coupon.entity").Coupon>;
    findAll(page: number, limit: number): Promise<{
        data: import("./entities/coupon.entity").Coupon[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/coupon.entity").Coupon>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<{
        value: string;
        discount: number;
        validate: number;
        id: number;
        uuid: string;
        createAt: Date;
    } & import("./entities/coupon.entity").Coupon>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
