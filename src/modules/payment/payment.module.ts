import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from '../order/order.module';
import { ProductsModule } from '../products/products.module';
import { CouponsModule } from '../coupons/coupons.module';

@Module({
  imports: [ProductsModule, CouponsModule, OrderModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
