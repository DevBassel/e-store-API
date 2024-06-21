import { Type } from 'class-transformer';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 32)
  name: string;

  @IsString()
  @Length(2, 200)
  description: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}
