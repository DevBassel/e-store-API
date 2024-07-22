import { User } from 'src/modules/user/entities/user.entity';
import { PaymentType } from '../enums/payment-type.enum';
import { OrderItem } from './order-item.entity';
import { PaymentStatus } from '../enums/payment-status.enum';
import { OrderStatus } from '../enums/order-status.enum';
export declare class Order {
    id: number;
    userId: number;
    user: User;
    items: OrderItem[];
    total: number;
    coupon: string;
    paymentStatus: PaymentStatus;
    status: OrderStatus;
    paymentMethod: PaymentType;
    shippingAddress: string;
    shipingDate: Date;
    trackingNumber: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
}
