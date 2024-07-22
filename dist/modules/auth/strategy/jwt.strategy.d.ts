import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload';
import { UserService } from 'src/modules/user/user.service';
declare const JWTStrategy_base: new (...args: any[]) => Strategy;
export declare class JWTStrategy extends JWTStrategy_base {
    private readonly config;
    private readonly userService;
    constructor(config: ConfigService, userService: UserService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
