import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }
}
