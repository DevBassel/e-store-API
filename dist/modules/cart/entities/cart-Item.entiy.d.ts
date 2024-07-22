import { Cart } from './cart.entity';
import { Product } from 'src/modules/products/entities/product.entity';
export declare class CartItem {
    id: number;
    productId: number;
    product: Product;
    price: number;
    quantity: number;
    cart: Cart;
    cartId: number;
    createdAt: Date;
}
