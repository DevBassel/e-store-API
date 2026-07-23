import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guards/jwt.guard';
import { GetUser } from 'src/decorator/GetUser.decorator';
import { JwtPayload } from './dto/jwt-payload';

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

  @Post('refresh')
  refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refreshAccess(refreshToken);
  }

  @UseGuards(JwtGuard)
  @Post('log-out')
  logout(@GetUser() user: JwtPayload) {
    return this.authService.logout(user);
  }
}
