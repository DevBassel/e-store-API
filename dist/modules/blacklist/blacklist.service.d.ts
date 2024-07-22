import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { Blacklist } from './entities/blacklist.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class BlacklistService {
    private readonly blacklistRepo;
    private readonly jwt;
    private readonly config;
    constructor(blacklistRepo: Repository<Blacklist>, jwt: JwtService, config: ConfigService);
    create(createBlacklistDto: CreateBlacklistDto): Promise<CreateBlacklistDto & Blacklist>;
    isTokenBlacklisted(token: string): Promise<boolean>;
    remove(): string;
}
