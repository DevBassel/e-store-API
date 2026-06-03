import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { v4 } from 'uuid';
import { JwtManagementService } from '../jwt/jwt_managment.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly emailService: EmailService,
    private readonly jwt_manage: JwtManagementService,
  ) {}

  register(userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  async login(userData: LoginDto) {
    const user = await this.userService.findWithEmail(userData.email);

    if (!user)
      throw new UnauthorizedException('email or password is wrong O_o');

    //  validate password
    const check = await compare(userData.password, user.password);

    if (!check)
      throw new UnauthorizedException('email or password is wrong O_o');

    return {
      accessToken: this.jwt.sign({
        jti: v4(),
        username: user.username,
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async logout(jti: string) {
    await this.jwt_manage.blackListToken(jti);
    return { msg: 'logout success' };
  }
}
