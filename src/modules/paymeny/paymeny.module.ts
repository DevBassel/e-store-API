import { Module } from '@nestjs/common';
import { PaymenyService } from './paymeny.service';
import { PaymenyController } from './paymeny.controller';
import { OrderModule } from '../order/order.module';
import { ProductsModule } from '../products/products.module';
import { CouponsModule } from '../coupons/coupons.module';

@Module({
  imports: [OrderModule, ProductsModule, CouponsModule],
  controllers: [PaymenyController],
  providers: [PaymenyService],
})
export class PaymenyModule {}
