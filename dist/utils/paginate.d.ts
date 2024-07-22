import { SelectQueryBuilder } from 'typeorm';
export declare function paginate<T>(Q: SelectQueryBuilder<T>, page?: number, limit?: number): Promise<{
    data: T[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}>;
