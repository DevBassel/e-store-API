"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const cart_Item_entiy_1 = require("./entities/cart-Item.entiy");
const order_service_1 = require("../order/order.service");
let CartService = class CartService {
    constructor(cartRepo, cartItemRepo, productsService, orderService) {
        this.cartRepo = cartRepo;
        this.cartItemRepo = cartItemRepo;
        this.productsService = productsService;
        this.orderService = orderService;
    }
    async create(createCartDto, user) {
        const product = await this.productsService.findOne(createCartDto.productId);
        if (!product && product.stock < createCartDto.quantity)
            throw new common_1.BadRequestException('product is out of stock');
        let cart = await this.cartRepo.findOneBy({ userId: user.id });
        if (!cart)
            cart = await this.cartRepo.save({ userId: user.id });
        const newItem = await this.cartItemRepo.save({
            cartId: cart.id,
            price: product.price * createCartDto.quantity,
            productId: createCartDto.productId,
            quantity: createCartDto.quantity,
        });
        return newItem;
    }
    async findAll(user) {
        const cart = await this.cartRepo.findOne({
            where: { userId: user.id },
            relations: {
                items: { product: { category: true } },
            },
        });
        if (!cart)
            throw new common_1.GoneException('your cart is empty O_o !!');
        return cart;
    }
    async findOne(id) {
        const cart = await this.cartRepo.findOne({
            where: { userId: id },
            relations: { items: { product: true } },
        });
        if (!cart)
            throw new common_1.GoneException('your cart is empty O_o !!');
        return cart;
    }
    async updateCartItem(id, updateCartDto) {
        const item = await this.cartItemRepo.findOne({
            where: { id },
            relations: { product: true },
        });
        console.log(item);
        if (!item)
            throw new common_1.NotFoundException('product not found');
        if (item.product.stock <= updateCartDto.quantity)
            throw new common_1.BadRequestException('product is out of stock');
        const updateItem = await this.cartItemRepo.save({
            ...item,
            ...updateCartDto,
            price: item.product.price * updateCartDto.quantity,
        });
        return updateItem;
    }
    async updateCart(status, user) {
        const cart = await this.findOne(user.id);
        console.log();
        return this.cartRepo.save({ ...cart, orderStatus: status });
    }
    async remove(id) {
        return this.cartItemRepo.delete({ id });
    }
    clearCart(id) {
        return this.cartRepo.delete({ id });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_Item_entiy_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService,
        order_service_1.OrderService])
], CartService);
//# sourceMappingURL=cart.service.js.map