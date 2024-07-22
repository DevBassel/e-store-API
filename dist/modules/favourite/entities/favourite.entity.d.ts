import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Favourite {
    id: number;
    user: User;
    userId: number;
    productId: number;
    product: Product;
    createdAt: Date;
}
