import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistService } from 'src/modules/blacklist/blacklist.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly blacklistService: BlacklistService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (await this.blacklistService.isTokenBlacklisted(token))
      throw new UnauthorizedException('user has been loged out O_o');

    return super.canActivate(context) as Promise<boolean>;
  }
}
