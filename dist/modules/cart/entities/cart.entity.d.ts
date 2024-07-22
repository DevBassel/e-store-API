import { User } from 'src/modules/user/entities/user.entity';
import { CartItem } from './cart-Item.entiy';
export declare class Cart {
    id: number;
    items: CartItem[];
    userId: number;
    user: User;
}
