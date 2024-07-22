import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';

describe('Coupons module', () => {
  let couponsSERV: CouponsService;
  const COUPON_REPO_TOKEN = getRepositoryToken(Coupon);
  let couponRepo = Repository<Coupon>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CouponsService,
        {
          provide: COUPON_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    couponsSERV = moduleRef.get<CouponsService>(CouponsService);
    couponRepo = moduleRef.get<Repository<Coupon>>(COUPON_REPO_TOKEN) as any;
  });

  it('should be defined', () => {
    expect(couponsSERV).toBeDefined();
  });

  it('Coupon Repo ', () => {
    expect(couponRepo).toBeDefined();
  });
});
