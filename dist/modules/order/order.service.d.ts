import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CartService } from '../cart/cart.service';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { EmailService } from '../email/email.service';
import { OrderStatus } from './enums/order-status.enum';
import { PaymentStatus } from './enums/payment-status.enum';
import { CouponsService } from '../coupons/coupons.service';
export declare class OrderService {
    private readonly cartServices;
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly emailServiec;
    private readonly couponServiec;
    constructor(cartServices: CartService, orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, emailServiec: EmailService, couponServiec: CouponsService);
    create(createOrderDto: CreateOrderDto, user: JwtPayload): Promise<{
        userId: number;
        total: number;
        shipingDate: string;
        coupon: string;
        paymentMethod: import("./enums/payment-type.enum").PaymentType;
        shippingAddress: string;
        trackingNumber: string;
        note: string;
    } & Order>;
    findAll(user: JwtPayload, page: number, limit: number, status: OrderStatus): Promise<{
        data: Order[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, user: JwtPayload): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto, user: JwtPayload): Promise<{
        paymentStatus: PaymentStatus;
        status: OrderStatus;
        paymentMethod: import("./enums/payment-type.enum").PaymentType;
        shippingAddress: string;
        trackingNumber: string;
        note: string;
        coupon: string;
        id: number;
        userId: number;
        user: import("../user/entities/user.entity").User;
        items: OrderItem[];
        total: number;
        shipingDate: Date;
        createdAt: Date;
        updatedAt: Date;
    } & Order>;
    cancel(id: number, user: JwtPayload): Promise<void>;
}
