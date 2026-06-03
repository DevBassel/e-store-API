import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload';
import { UserService } from 'src/modules/user/user.service';
import { JwtManagementService } from 'src/modules/jwt/jwt_managment.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly jwtManagement: JwtManagementService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow('JWT_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const checkToken = await this.jwtManagement.isBlacklisted(payload.jti);
    if (checkToken) throw new UnauthorizedException('invalid token');

    const checkUser = await this.userService.findOneUser(payload.id);
    if (!checkUser) throw new UnauthorizedException();

    return payload;
  }
}
