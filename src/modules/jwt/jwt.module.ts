import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTManagement } from './entities/jwt.entity';
import { JwtManagementService } from './jwt_managment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JWTManagement]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        isGlobal: true,
        secret: config.getOrThrow('JWT_KEY'),
        signOptions: {
          expiresIn: '30d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtManagementService],
  exports: [JwtModule, JwtManagementService],
})
export class GlobalJwtModule {}
