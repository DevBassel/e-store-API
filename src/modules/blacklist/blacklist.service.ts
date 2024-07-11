import { Injectable } from '@nestjs/common';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from './entities/blacklist.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly blacklistRepo: Repository<Blacklist>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  create(createBlacklistDto: CreateBlacklistDto) {
    console.log('token add');

    if (
      this.jwt.verify(
        createBlacklistDto.token,
        this.config.getOrThrow('JWT_KEY'),
      )
    )
      console.log('valid token');
    return this.blacklistRepo.save(createBlacklistDto);
  }

  async isTokenBlacklisted(token: string) {
    const check = await this.blacklistRepo.findOneBy({ token });
    console.log({ check });
    return check ? true : false;
  }

  remove() {
    return `This action removes a # blacklist`;
  }
}
