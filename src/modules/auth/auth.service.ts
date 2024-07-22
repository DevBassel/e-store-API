import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BlacklistService } from '../blacklist/blacklist.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from '../email/email.service';
import { resetPasswordTemp } from '../email/templates/reset-password';
import { ResetPasswordPayload } from './dto/reset-password-payload';
import { JwtPayload } from './dto/jwt-payload';
import {
  ResetPasswordEmailDto,
  ResetPasswordUserDto,
} from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly blacklistService: BlacklistService,
    private readonly jwt: JwtService,
    private readonly emailService: EmailService,
  ) {}

  register(userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  async login(userData: LoginDto) {
    const user = await this.userService.findWithEmail(userData.email);

    if (!user)
      throw new UnauthorizedException('email or password is wrong O_o');

    //  vlidate password
    const check = await compare(userData.password, user.password);

    if (!check)
      throw new UnauthorizedException('email or password is wrong O_o');

    return {
      accessToken: this.jwt.sign({
        username: user.username,
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async logout(req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log({ token });
    await this.blacklistService.create({ token });
    return { msg: 'logout success' };
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.userService.findWithEmail(data.email);
    if (user) {
      const token = this.jwt.sign(
        {
          type: 'reset-password',
          id: user.id,
        },
        {
          expiresIn: '5m',
        },
      );

      const link = `${process.env.HOST}/api/v1/auth/reset-password-email?token=${token}`;

      this.emailService.sendEmail({
        to: user.email,
        subject: 'reset password',
        html: resetPasswordTemp(link),
      });
    }

    return { msg: 'check your email ^_^' };
  }

  async resetPasswordFromEmail(token: string, data: ResetPasswordEmailDto) {
    try {
      const tokenValue: ResetPasswordPayload = this.jwt.verify(token);

      const checkToken = await this.blacklistService.isTokenBlacklisted(token);

      if (checkToken)
        throw new BadRequestException('link has been expiered O_o');

      if (tokenValue.type !== 'reset-password') throw new BadRequestException();

      await this.passwordReset(data.newPassword, tokenValue.id);

      await this.blacklistService.create({ token });

      return { msg: 'password has been reset' };
    } catch (error) {
      return { msg: error.message };
    }
  }

  async resetPasswordUser(user: JwtPayload, data: ResetPasswordUserDto) {
    const checkUser = await this.userService.findOneUser(user.id);

    if (!compare(data.password, checkUser.password))
      throw new UnauthorizedException();

    return this.passwordReset(data.newPassword, user.id);
  }

  async passwordReset(newPassword: string, userId: number) {
    const hashPassword = await hash(newPassword, await genSalt());

    await this.userService.updateUser(userId, {
      password: hashPassword,
    });
  }
}
