import { Module } from '@nestjs/common';
import { PaymenyService } from './paymeny.service';
import { PaymenyController } from './paymeny.controller';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [PaymenyController],
  providers: [PaymenyService],
})
export class PaymenyModule {}
