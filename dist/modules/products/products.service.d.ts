/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class ProductsService {
    private readonly productRepo;
    private readonly categoryService;
    private readonly cloudeService;
    constructor(productRepo: Repository<Product>, categoryService: CategoriesService, cloudeService: CloudinaryService);
    create(createProductDto: CreateProductDto, img: Express.Multer.File): Promise<{
        img: any;
        name: string;
        description: string;
        stock: number;
        price: number;
        categoryId: number;
    } & Product>;
    findAll(page: number, limit: number, filter: {
        category: string;
        min: number;
        max: number;
        s: string;
    }): Promise<{
        data: Product[];
        total: number;
        pages: number;
        page: number;
        limit: number;
    }>;
    findOne(id?: number, categoryId?: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        category: {
            id: number;
            name: string;
            products: Product;
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
    } & Product>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
