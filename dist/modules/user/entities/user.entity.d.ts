import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Role } from 'src/modules/auth/enums/role.enum';
import { Review } from 'src/modules/review/entities/review.entity';
import { Favourite } from 'src/modules/favourite/entities/favourite.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    role: Role;
    cart: Cart;
    orders: Order[];
    reviews: Review[];
    favourites: Favourite[];
    joinAt: Date;
    updateAt: Date;
}
export declare class UserSerializer extends User {
    password: string;
    constructor(user: Partial<User>);
}
