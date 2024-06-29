import {
  BadRequestException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CartItem } from './entities/cart-Item.entiy';
import { OrderStatus } from '../order/enums/order-status.enum';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}
  async create(createCartDto: CreateCartDto, user: JwtPayload) {
    const product = await this.productsService.findOne(createCartDto.productId);
    if (!product && product.stock < createCartDto.quantity)
      throw new BadRequestException('product is out of stock');

    let cart = await this.cartRepo.findOneBy({ userId: user.id });
    if (!cart) cart = await this.cartRepo.save({ userId: user.id });

    const newItem = await this.cartItemRepo.save({
      cartId: cart.id,
      price: product.price * createCartDto.quantity,
      productId: createCartDto.productId,
      quantity: createCartDto.quantity,
    });

    return newItem;
  }

  async findAll(user: JwtPayload) {
    const cart = await this.cartRepo.findOne({
      where: { userId: user.id },
      relations: {
        items: { product: { category: true } },
      },
    });

    if (!cart) throw new GoneException('your cart is empty O_o !!');

    return cart;
  }

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne({
      where: { userId: id },
      relations: { items: { product: true } },
    });

    if (!cart) throw new GoneException('your cart is empty O_o !!');

    return cart;
  }

  async updateCartItem(id: number, updateCartDto: UpdateCartItemDto) {
    const item = await this.cartItemRepo.findOne({
      where: { id },
      relations: { product: true },
    });
    console.log(item);
    if (!item) throw new NotFoundException('product not found');

    if (item.product.stock <= updateCartDto.quantity)
      throw new BadRequestException('product is out of stock');

    const updateItem = await this.cartItemRepo.save({
      ...item,
      ...updateCartDto,
      price: item.product.price * updateCartDto.quantity,
    });

    return updateItem;
  }

  async updateCart(status: OrderStatus, user: JwtPayload) {
    const cart = await this.findOne(user.id);
    console.log();
    return this.cartRepo.save({ ...cart, orderStatus: status });
  }

  async remove(id: number) {
    return this.cartItemRepo.delete({ id });
  }

  clearCart(id: number) {
    return this.cartRepo.delete({ id });
  }
}
