import { UserService } from './user.service';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { UpdateProfileDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(page: number, limit: number): Promise<{
        data: import("./entities/user.entity").UserSerializer[];
        metadata: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    getProfile(req: Request & {
        user: JwtPayload;
    }): Promise<import("./entities/user.entity").UserSerializer>;
    updateProfile(updateUserDto: UpdateProfileDto, req: Request & {
        user: JwtPayload;
    }): Promise<{
        msg: string;
    }>;
    getOneUser(userId: number): Promise<import("./entities/user.entity").UserSerializer>;
}
