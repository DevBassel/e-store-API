import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtPayload } from './dto/jwt-payload';
import { ResetPasswordEmailDto, ResetPasswordUserDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: CreateUserDto): Promise<{
        msg: string;
    }>;
    login(userData: LoginDto): Promise<{
        accessToken: string;
    }>;
    logout(req: Request): Promise<{
        msg: string;
    }>;
    forgotPasseword(data: ForgotPasswordDto): Promise<{
        msg: string;
    }>;
    resetPasswordClientFromEmail(): string;
    resetPassword(token: string, data: ResetPasswordEmailDto): Promise<{
        msg: any;
    }>;
    resetPasswordUser(req: Request & {
        user: JwtPayload;
    }, data: ResetPasswordUserDto): Promise<void>;
}
