import { EntityManager } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
export declare class SeedingService {
    private readonly em;
    constructor(em: EntityManager);
    seed(count: number): Promise<{
        msg: string;
    }>;
    genUser(): Promise<void>;
    genCategory(): Promise<Category>;
    genPrduct(catId: number): Promise<void>;
    clear(): Promise<void>;
}
