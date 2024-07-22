import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtPayload } from './dto/jwt-payload';
import {
  ResetPasswordEmailDto,
  ResetPasswordUserDto,
} from './dto/reset-password.dto';

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

  @Post('forgot-password')
  forgotPasseword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data);
  }

  @Get('reset-password-email')
  resetPasswordClientFromEmail() {
    return '<h1>client form data</h1>';
  }

  @Post('reset-password-email')
  resetPassword(
    @Query('token') token: string,
    @Body() data: ResetPasswordEmailDto,
  ) {
    return this.authService.resetPasswordFromEmail(token, data);
  }

  @UseGuards(JwtGuard)
  @Post('reset-password-user')
  resetPasswordUser(
    @Req() req: Request & { user: JwtPayload },
    @Body() data: ResetPasswordUserDto,
  ) {
    return this.authService.resetPasswordUser(req.user, data);
  }
}
