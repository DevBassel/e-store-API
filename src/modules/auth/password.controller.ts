import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import {
  ResetPasswordForgotDto,
  ResetPasswordUserDto,
  // ResetPasswordUserDto,
} from './dto/reset-password.dto';
import { GetUser } from 'src/decorator/GetUser.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Password Management')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(body);
  }

  @Post('reset-forgot-password')
  async resetPassword(@Body() body: ResetPasswordForgotDto) {
    return this.passwordService.resetForgotPassword(body);
  }

  @UseGuards(JwtGuard)
  @Post('reset-password')
  resetUserPassword(
    @Body() body: ResetPasswordUserDto,
    @GetUser('id') userid: number,
  ) {
    return this.passwordService.resetUserPassword(body, userid);
  }
}
