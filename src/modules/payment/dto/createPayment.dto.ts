import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  orderId: number;

  @IsString()
  @IsOptional()
  coupon?: string;
}
