import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
export declare class CategoriesService {
    private readonly categoryRepo;
    private readonly productService;
    constructor(categoryRepo: Repository<Category>, productService: ProductsService);
    create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & Category>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        products: import("../products/entities/product.entity").Product;
    } & Category>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
