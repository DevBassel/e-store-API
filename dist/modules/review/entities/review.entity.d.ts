import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Review {
    id: number;
    productId: number;
    userId: number;
    content: string;
    rating: number;
    product: Product;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
