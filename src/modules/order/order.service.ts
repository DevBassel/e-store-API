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

@Injectable()
export class OrderService {
  constructor(
    @Inject(forwardRef(() => CartService))
    private readonly cartServices: CartService,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    private readonly emailServiec: EmailService,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: JwtPayload) {
    const cartItems = await this.cartServices.findAll(user);

    if (!cartItems) throw new GoneException('your cart is empty O_o !!');

    const createOrder = await this.orderRepo.save({
      ...createOrderDto,
      userId: user.id,
      total: cartItems.items.reduce((p, c) => p + c.price, 0),
      shipingDate: new Date().toISOString(),
    });

    const orderItems = cartItems.items.map((item) => ({
      orderId: createOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price_at_buy: item.product.price,
    }));

    await this.orderItemRepo.save(orderItems);

    await this.cartServices.clearCart(cartItems.id);

    this.emailServiec.sendEmail({
      to: user.email,
      subject: 'Confiarm Order',
      html: orederTepm({ products: cartItems.items as any }),
    });

    return createOrder;
  }

  findAll(user: JwtPayload) {
    return this.orderRepo.find({
      where: { userId: user.id },
      relations: { items: { product: true } },
    });
  }

  async findOne(id: number, user: JwtPayload) {
    const order = await this.orderRepo.findOne({
      where: { id, userId: user.id },
      relations: { items: { product: true } },
    });

    if (!order) throw new NotFoundException('order not found');

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, user: JwtPayload) {
    const order = await this.findOne(id, user);
    if (!order) throw new NotFoundException('oreder not found');

    return this.orderRepo.save({
      ...order,
      ...updateOrderDto,
    });
  }

  async cancel(id: number, user: JwtPayload) {
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
