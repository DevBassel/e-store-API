import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @Length(6, 9)
  value: string;

  @IsNumber()
  @Min(1)
  discount: number;

  @IsNumber()
  @Min(1)
  validate: number;
}
