import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { PaymentType } from '../enums/payment-type.enum';

export class CreateOrderDto {
  @IsEnum(PaymentType)
  paymentMethod: PaymentType;

  @IsString()
  shippingAddress: string;

  @IsString()
  trackingNumber: string;

  @IsString()
  note: string;

  @IsString()
  @Length(6)
  @IsOptional()
  coupon: string;
}
