import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guards/jwt.guard';
import { GetUser } from 'src/decorator/GetUser.decorator';

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
  @Post('log-out')
  logout(@GetUser('jti') jti: string) {
    return this.authService.logout(jti);
  }
}
