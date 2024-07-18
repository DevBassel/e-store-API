import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BlacklistService } from '../blacklist/blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly blacklistService: BlacklistService,
    private readonly jwt: JwtService,
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
}
