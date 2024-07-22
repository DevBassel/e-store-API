import { Module } from '@nestjs/common';
import { PaymenyService } from './paymeny.service';
import { PaymenyController } from './paymeny.controller';
import { OrderModule } from '../order/order.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [OrderModule, ProductsModule],
  controllers: [PaymenyController],
  providers: [PaymenyService],
})
export class PaymenyModule {}
