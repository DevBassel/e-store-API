import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { v4 } from 'uuid';
import { JwtManagementService } from '../jwt/jwt_managment.service';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './dto/jwt-payload';
import { loginTemp } from '../email/templates/login.templet';
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

    this.emailService.sendEmail({
      to: user.email,
      subject: 'Welcome Back ^_^',
      html: loginTemp({ username: user.username }),
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      ...(await this.returnUserCredential(user)),
    };
  }

  async refreshAccess(refreshToken: string) {
    const refreshPayload = await this.jwt.verifyAsync(refreshToken);

    const checkToken = await this.jwt_manage.isBlacklisted(refreshPayload.jti);
    if (checkToken) throw new UnauthorizedException('invalid token');

    if (refreshPayload.type !== 'refresh-token')
      throw new UnauthorizedException('invalid refresh token');

    const user = await this.userService.findOneUser(refreshPayload.id);
    if (user.refreshJti !== refreshPayload.jti) {
      throw new UnauthorizedException('invalid refresh token');
    }

    return this.returnUserCredential(user);
  }

  async logout(user: JwtPayload) {
    await this.jwt_manage.blackListToken(user.jti);
    await this.userService.updateUser(user.id, { refreshJti: null });
    return { msg: 'logout success' };
  }

  private async returnUserCredential(user: User) {
    const refreshJti = v4();
    await this.userService.updateUser(user.id, { refreshJti });

    const payload = {
      username: user.username,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwt.sign({
        jti: v4(),
        type: 'access-token',
        ...payload,
      }),

      refreshToken: this.jwt.sign({
        jti: refreshJti,
        type: 'refresh-token',
        ...payload,
      }),
    };
  }
}
