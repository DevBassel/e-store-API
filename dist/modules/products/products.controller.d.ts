/// <reference types="multer" />
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, img: Express.Multer.File): Promise<{
        img: any;
        name: string;
        description: string;
        stock: number;
        price: number;
        categoryId: number;
    } & import("./entities/product.entity").Product>;
    findAll(page: number, limit: number, category: string, min: number, max: number, s: string): Promise<{
        data: import("./entities/product.entity").Product[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        category: {
            id: number;
            name: string;
            products: import("./entities/product.entity").Product;
        };
        name: string;
        description: string;
        stock: number;
        price: number;
        categoryId: number;
        id: number;
        img: string;
        rate: number;
        cartItem: import("../cart/entities/cart-Item.entiy").CartItem;
        orderItem: import("../order/entities/order-item.entity").OrderItem;
        reviews: import("../review/entities/review.entity").Review[];
        favourites: import("../favourite/entities/favourite.entity").Favourite[];
    } & import("./entities/product.entity").Product>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
