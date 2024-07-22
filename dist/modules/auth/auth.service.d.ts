import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BlacklistService } from '../blacklist/blacklist.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from '../email/email.service';
import { JwtPayload } from './dto/jwt-payload';
import { ResetPasswordEmailDto, ResetPasswordUserDto } from './dto/reset-password.dto';
export declare class AuthService {
    private readonly userService;
    private readonly blacklistService;
    private readonly jwt;
    private readonly emailService;
    constructor(userService: UserService, blacklistService: BlacklistService, jwt: JwtService, emailService: EmailService);
    register(userData: CreateUserDto): Promise<{
        msg: string;
    }>;
    login(userData: LoginDto): Promise<{
        accessToken: string;
    }>;
    logout(req: Request): Promise<{
        msg: string;
    }>;
    forgotPassword(data: ForgotPasswordDto): Promise<{
        msg: string;
    }>;
    resetPasswordFromEmail(token: string, data: ResetPasswordEmailDto): Promise<{
        msg: any;
    }>;
    resetPasswordUser(user: JwtPayload, data: ResetPasswordUserDto): Promise<void>;
    passwordReset(newPassword: string, userId: number): Promise<void>;
}
