import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  register(userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }
  async login(userData: LoginDto) {
    const user = await this.userService.findWithEmail(userData.email);

    //  vlidate password
    const check = await compare(userData.password, user.password);

    if (!check)
      throw new UnauthorizedException('email or password is wrong O_o');

    return {
      accessToken: this.jwt.sign({
        username: user.username,
        id: user.id,
        email: user.email,
      }),
    };
  }
}
