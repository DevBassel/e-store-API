import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from '../enums/payment-status.enum';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;

  @IsString()
  @IsOptional()
  paymentIntentId?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsNumber()
  @IsOptional()
  couponId?: number;
}
