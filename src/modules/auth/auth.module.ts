import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategy/jwt.strategy';
import { EmailModule } from '../email/email.module';
import { GlobalJwtModule } from '../jwt/jwt.module';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';

@Module({
  imports: [GlobalJwtModule, UserModule, EmailModule],
  controllers: [AuthController, PasswordController],
  providers: [AuthService, JWTStrategy, PasswordService],
})
export class AuthModule {}
