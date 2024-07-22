import { CreateUserDto } from './dto/create-user.dto';
import { User, UserSerializer } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { UpdateProfileDto } from './dto/update-user.dto';
import { EmailService } from '../email/email.service';
export declare class UserService {
    private readonly userRepo;
    private readonly emailServie;
    constructor(userRepo: Repository<User>, emailServie: EmailService);
    createUser(userDate: CreateUserDto): Promise<{
        msg: string;
    }>;
    updateUser(id: number, update: UpdateProfileDto): Promise<{
        username: string;
        email: string;
        phone: string;
        password: string;
        id: number;
        address: string;
        role: import("../auth/enums/role.enum").Role;
        cart: import("../cart/entities/cart.entity").Cart;
        orders: import("../order/entities/order.entity").Order[];
        reviews: import("../review/entities/review.entity").Review[];
        favourites: import("../favourite/entities/favourite.entity").Favourite[];
        joinAt: Date;
        updateAt: Date;
    } & User>;
    getProfile(user: JwtPayload): Promise<UserSerializer>;
    updateProfile(userData: UpdateProfileDto, user: JwtPayload): Promise<{
        msg: string;
    }>;
    findOneUser(id: number): Promise<UserSerializer>;
    findWithEmail(email: string): Promise<User>;
    getAllUsers(page?: number, limit?: number): Promise<{
        data: UserSerializer[];
        metadata: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    deleteUser(userId: number): {
        msg: string;
    };
}
