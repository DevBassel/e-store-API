import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CartItem } from './entities/cart-Item.entiy';

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

    const cart = await this.cartRepo.findOneBy({ userId: user.id });
    if (!cart) await this.cartRepo.save({ userId: user.id });

    return this.cartItemRepo.save({
      cartId: cart.id,
      price: product.price * createCartDto.quantity,
      productId: createCartDto.productId,
      quantity: createCartDto.quantity,
    });
  }

  findAll(user: JwtPayload) {
    return this.cartRepo.findOne({
      where: { userId: user.id },
      relations: {
        items: { product: { category: true } },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const item = await this.cartItemRepo.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!item) throw new NotFoundException('product not found');

    if (item.product.stock <= updateCartDto.quantity)
      throw new BadRequestException('product is out of stock');

    return this.cartItemRepo.save({
      ...item,
      ...updateCartDto,
      price: item.product.price * updateCartDto.quantity,
    });
  }

  remove(id: number) {
    return this.cartItemRepo.delete({ id });
  }
}
