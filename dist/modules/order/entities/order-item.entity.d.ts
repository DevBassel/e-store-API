import { Order } from './order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
export declare class OrderItem {
    id: number;
    orderId: number;
    order: Order;
    product: Product;
    productId: number;
    quantity: number;
    price_at_buy: number;
}
