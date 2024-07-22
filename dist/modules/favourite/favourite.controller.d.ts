import { FavouriteService } from './favourite.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
export declare class FavouriteController {
    private readonly favouriteService;
    constructor(favouriteService: FavouriteService);
    create(createFavouriteDto: CreateFavouriteDto, req: Request & {
        user: JwtPayload;
    }): Promise<{
        userId: number;
        productId: number;
    } & import("./entities/favourite.entity").Favourite>;
    findAll(req: Request & {
        user: JwtPayload;
    }): Promise<import("./entities/favourite.entity").Favourite[]>;
    findOne(id: string): Promise<import("./entities/favourite.entity").Favourite>;
    remove(id: string, req: Request & {
        user: JwtPayload;
    }): Promise<import("typeorm").DeleteResult>;
}
