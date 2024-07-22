import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { OrderStatus } from './enums/order-status.enum';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto, req: Request & {
        user: JwtPayload;
    }): Promise<{
        userId: number;
        total: number;
        shipingDate: string;
        coupon: string;
        paymentMethod: import("./enums/payment-type.enum").PaymentType;
        shippingAddress: string;
        trackingNumber: string;
        note: string;
    } & import("./entities/order.entity").Order>;
    findAll(req: Request & {
        user: JwtPayload;
    }, page: number, limit: number, status: OrderStatus): Promise<{
        data: import("./entities/order.entity").Order[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, req: Request & {
        user: JwtPayload;
    }): Promise<import("./entities/order.entity").Order>;
    update(id: string, updateOrderDto: UpdateOrderDto, req: Request & {
        user: JwtPayload;
    }): Promise<{
        paymentStatus: import("./enums/payment-status.enum").PaymentStatus;
        status: OrderStatus;
        paymentMethod: import("./enums/payment-type.enum").PaymentType;
        shippingAddress: string;
        trackingNumber: string;
        note: string;
        coupon: string;
        id: number;
        userId: number;
        user: import("../user/entities/user.entity").User;
        items: import("./entities/order-item.entity").OrderItem[];
        total: number;
        shipingDate: Date;
        createdAt: Date;
        updatedAt: Date;
    } & import("./entities/order.entity").Order>;
    remove(id: string, req: Request & {
        user: JwtPayload;
    }): Promise<void>;
}
