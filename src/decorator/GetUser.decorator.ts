import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/modules/auth/dto/jwt-payload';

export const GetUser = createParamDecorator(
  (
    prop: keyof JwtPayload | undefined,
    ctx: ExecutionContext,
  ): JwtPayload | JwtPayload[keyof JwtPayload] => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;
    // console.log({ user });
    return prop ? user[prop] : user;
  },
);
