import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 32)
  name: string;

  @IsString()
  @Length(2, 200)
  description: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsNumber()
  categoryId: number;
}
