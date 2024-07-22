import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private readonly couponRepo: Repository<Coupon>,
  ) {}
  async create(createCouponDto: CreateCouponDto) {
    const coupon = await this.couponRepo.findOneBy({
      value: createCouponDto.value,
    });

    if (coupon) throw new ConflictException('this coupon is exist!');
    return this.couponRepo.save(createCouponDto);
  }

  findAll(page: number, limit: number) {
    const Q = this.couponRepo.createQueryBuilder('coupon');
    return paginate(Q, page, limit);
  }

  async findOne(value: string) {
    const coupon = await this.couponRepo.findOneBy({ value });

    if (!coupon) throw new NotFoundException('coupon not found');

    return coupon;
  }

  async validateCoupon(value: string) {
    const coupon = await this.findOne(value);
    const creatTime = new Date(coupon.createAt).getTime();
    const calcEnd = creatTime + coupon.validate * 1000 * 60 * 60 * 24;
    const isacrtive = calcEnd > creatTime;

    console.log({ creatTime, calcEnd, isacrtive });

    if (!isacrtive) throw new BadRequestException('not valid coupon');

    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepo.findOneBy({ id });
    if (!coupon) throw new NotFoundException('coupon not found');

    return this.couponRepo.save({ ...coupon, ...updateCouponDto });
  }

  remove(id: number) {
    return this.couponRepo.delete({ id });
  }
}
