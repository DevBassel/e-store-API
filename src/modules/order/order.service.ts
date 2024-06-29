import { GoneException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CartService } from '../cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartServices: CartService,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
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

    return createOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
