import { CartItem } from 'src/modules/cart/entities/cart-Item.entiy';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Favourite } from 'src/modules/favourite/entities/favourite.entity';
import { OrderItem } from 'src/modules/order/entities/order-item.entity';
import { Review } from 'src/modules/review/entities/review.entity';
export declare class Product {
    id: number;
    name: string;
    img: string;
    rate: number;
    stock: number;
    description: string;
    price: number;
    cartItem: CartItem;
    category: Category;
    orderItem: OrderItem;
    reviews: Review[];
    favourites: Favourite[];
    categoryId: number;
}
