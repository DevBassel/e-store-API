import { CreateCartDto } from './create-cart-item.dto';
declare const UpdateCartItemDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCartDto>>;
export declare class UpdateCartItemDto extends UpdateCartItemDto_base {
    productId?: number;
}
export {};
