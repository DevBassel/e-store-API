import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BlacklistService } from 'src/modules/blacklist/blacklist.service';
declare const JwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtGuard extends JwtGuard_base {
    private reflector;
    private readonly blacklistService;
    constructor(reflector: Reflector, blacklistService: BlacklistService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
