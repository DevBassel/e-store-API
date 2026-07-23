import {
  GoneException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CartService } from '../cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { EmailService } from '../email/email.service';
import { orederTepm } from '../email/templates/order.templet';
import { OrderStatus } from './enums/order-status.enum';
import { PaymentStatus } from './enums/payment-status.enum';
import { paginate } from 'src/utils/paginate';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  stripe: Stripe;

  constructor(
    private config: ConfigService,
    @Inject(forwardRef(() => CartService))
    private readonly cartServices: CartService,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    private readonly emailService: EmailService,
  ) {
    this.stripe = new Stripe(config.getOrThrow('STRIPE_SK'));
  }
  async create(createOrderDto: CreateOrderDto, user: JwtPayload) {
    const cartItems = await this.cartServices.findAll(user);

    if (!cartItems) throw new GoneException('your cart is empty O_o !!');

    const total = cartItems.items.reduce((p, c) => p + c.price, 0);
    const { ...orderData } = createOrderDto;

    const createOrder = await this.orderRepo.save({
      ...orderData,
      userId: user.id,
      total: total,
      shipingDate: null,
    });

    const orderItems = cartItems.items.map((item) => ({
      orderId: createOrder.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    await this.orderItemRepo.save(orderItems);

    await this.cartServices.clearCart(cartItems.id);

    this.emailService.sendEmail({
      to: user.email,
      subject: 'Confiarm Order',
      html: orederTepm({ products: cartItems.items as any }),
    });

    return createOrder;
  }

  findAll(user: JwtPayload, page: number, limit: number, status: OrderStatus) {
    const Q = this.orderRepo
      .createQueryBuilder('order')
      .leftJoin('order.items', 'items')
      .leftJoin('items.product', 'product')
      .leftJoin('order.coupon', 'coupon')
      .where('order.userId = :id', { id: user.id })
      .select(['order', 'items', 'product', 'coupon']);

    status && Q.andWhere('order.status = :status', { status });

    return paginate(Q, page, limit);
  }

  async findOne(id: number, user: JwtPayload) {
    const order = await this.orderRepo.findOne({
      where: { id, userId: user.id },
      relations: { items: { product: true }, coupon: true },
    });

    if (!order) throw new NotFoundException('order not found');

    return order;
  }

  async getUserOrders(userId: number) {
    const order = await this.orderRepo.find({
      where: { userId },
      relations: { items: { product: true }, coupon: true },
    });

    console.log(
      '🚀 ~ order.service.ts:105 ~ OrderService ~ getUserOrders ~ order:',
      order,
    );

    return order;
  }
  async update(id: number, updateOrderDto: UpdateOrderDto, user: JwtPayload) {
    const order = await this.findOne(id, user);
    if (!order) throw new NotFoundException('order not found');

    return this.orderRepo.save({
      ...order,
      ...updateOrderDto,
    });
  }

  async orderPayed(
    orderId: number,
    paymentId: string,
    totalPayed: number,
    user: JwtPayload,
  ) {
    const order = await this.findOne(orderId, user);
    return await this.orderRepo.save({
      ...order,
      paymentIntentId: paymentId,
      totalPayed: totalPayed,
      paymentStatus: PaymentStatus.DONE,
      status: OrderStatus.SHIPING,
    });
  }

  async cancel(id: number, user: JwtPayload) {
    const order = await this.findOne(id, user);
    if (order.paymentStatus === PaymentStatus.DONE) {
      await this.stripe.refunds.create({
        payment_intent: order.paymentIntentId,
        amount: order.totalPayed,
      });

      await this.orderRepo.save({
        ...order,
        status: OrderStatus.CANCEL,
        paymentStatus: PaymentStatus.REFUNDED,
        totalRefunded: order.totalPayed,
        totalPayed: null,
      });
      return;
    } else {
      await this.update(
        id,
        {
          paymentStatus: PaymentStatus.CANCEL,
          status: OrderStatus.CANCEL,
        },
        user,
      );
    }
  }
}
