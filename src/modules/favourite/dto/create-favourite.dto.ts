import { IsNumber } from 'class-validator';

export class CreateFavouriteDto {
  @IsNumber()
  productId: number;
}
