import { CreateCartDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CartItem } from './entities/cart-Item.entiy';
import { OrderStatus } from '../order/enums/order-status.enum';
import { OrderService } from '../order/order.service';
export declare class CartService {
    private readonly cartRepo;
    private readonly cartItemRepo;
    private readonly productsService;
    readonly orderService: OrderService;
    constructor(cartRepo: Repository<Cart>, cartItemRepo: Repository<CartItem>, productsService: ProductsService, orderService: OrderService);
    create(createCartDto: CreateCartDto, user: JwtPayload): Promise<{
        cartId: number;
        price: number;
        productId: number;
        quantity: number;
    } & CartItem>;
    findAll(user: JwtPayload): Promise<Cart>;
    findOne(id: number): Promise<Cart>;
    updateCartItem(id: number, updateCartDto: UpdateCartItemDto): Promise<{
        price: number;
        productId: number;
        quantity: number;
        id: number;
        product: import("../products/entities/product.entity").Product;
        cart: Cart;
        cartId: number;
        createdAt: Date;
    } & CartItem>;
    updateCart(status: OrderStatus, user: JwtPayload): Promise<{
        orderStatus: OrderStatus;
        id: number;
        items: CartItem[];
        userId: number;
        user: import("../user/entities/user.entity").User;
    } & Cart>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    clearCart(id: number): Promise<import("typeorm").DeleteResult>;
}
