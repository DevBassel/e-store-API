import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart-item.dto';
import { Exclude } from 'class-transformer';

export class UpdateCartItemDto extends PartialType(CreateCartDto) {
  @Exclude()
  productId?: number;
}
