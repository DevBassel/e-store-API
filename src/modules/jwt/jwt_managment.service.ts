import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTManagement } from './entities/jwt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtManagementService {
  constructor(
    @InjectRepository(JWTManagement)
    private readonly jwtRepo: Repository<JWTManagement>,
  ) {}

  async blackListToken(jti: string) {
    const checkJTI = await this.jwtRepo.exists({ where: { jti } });
    if (checkJTI) throw new ConflictException('token already blacklisted');
    return this.jwtRepo.save({ jti });
  }
}
