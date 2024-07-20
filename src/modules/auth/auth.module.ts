import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategy/jwt.strategy';
import { BlacklistModule } from '../blacklist/blacklist.module';
import { RoleGuard } from './guards/role.guard';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [UserModule, BlacklistModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, RoleGuard],
})
export class AuthModule {}
