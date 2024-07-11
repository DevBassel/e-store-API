import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../enums/payment-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
