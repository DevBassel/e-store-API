import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto, req: Request & {
        user: JwtPayload;
    }): Promise<{
        cartId: number;
        price: number;
        productId: number;
        quantity: number;
    } & import("./entities/cart-Item.entiy").CartItem>;
    findAll(req: Request & {
        user: JwtPayload;
    }): Promise<import("./entities/cart.entity").Cart>;
    findOne(id: string): Promise<import("./entities/cart.entity").Cart>;
    update(id: string, updateCartItemDto: UpdateCartItemDto): Promise<{
        price: number;
        productId: number;
        quantity: number;
        id: number;
        product: import("../products/entities/product.entity").Product;
        cart: import("./entities/cart.entity").Cart;
        cartId: number;
        createdAt: Date;
    } & import("./entities/cart-Item.entiy").CartItem>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
