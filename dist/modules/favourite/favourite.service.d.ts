import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { Favourite } from './entities/favourite.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/dto/jwt-payload';
export declare class FavouriteService {
    private favRepo;
    constructor(favRepo: Repository<Favourite>);
    create(createFavouriteDto: CreateFavouriteDto, user: JwtPayload): Promise<{
        userId: number;
        productId: number;
    } & Favourite>;
    findAll(user: JwtPayload): Promise<Favourite[]>;
    findOne(id: number): Promise<Favourite>;
    remove(id: number, user: JwtPayload): Promise<import("typeorm").DeleteResult>;
}
