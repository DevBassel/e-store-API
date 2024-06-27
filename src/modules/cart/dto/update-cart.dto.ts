import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { Exclude } from 'class-transformer';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @Exclude()
  productId?: number;
}
