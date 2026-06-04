import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { resetPasswordTemp } from '../email/templates/reset-password';
import { ConfigService } from '@nestjs/config';
import {
  ResetPasswordForgotDto,
  ResetPasswordUserDto,
} from './dto/reset-password.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { resetUserPasswordTemp } from '../email/templates/resetPasswordTemp';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly emailService: EmailService,
    private readonly config: ConfigService,
  ) {}
  async forgotPassword(body: ForgotPasswordDto) {
    const user = await this.userService.findWithEmail(body.email);
    if (!user) throw new UnauthorizedException('User not found');

    const token = this.jwt.sign({ id: user.id });
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'forgot password',
      html: resetPasswordTemp(
        this.config.getOrThrow('CLIENT_URL') + `/reset-password?token=${token}`,
      ),
    });

    return {
      msg: 'check your email ^_^',
    };
  }

  async resetForgotPassword(body: ResetPasswordForgotDto) {
    const payload = this.jwt.verify(body.token);
    if (!payload) throw new UnauthorizedException('Invalid token');

    const user = await this.userService.findOneUser(payload.id);
    return this.resetPass(body.newPassword, user);
  }

  async resetUserPassword(body: ResetPasswordUserDto, userid: number) {
    const user = await this.userService.findOneUser(userid);

    if (!(await compare(body.password, user.password)))
      throw new UnauthorizedException('Invalid password');
    return this.resetPass(body.newPassword, user);
  }

  async resetPass(newPassword: string, user: User) {
    const hashedPassword = await hash(newPassword, await genSalt());
    await this.userService.updateUser(user.id, { password: hashedPassword });

    // send email to user
    this.emailService.sendEmail({
      to: user.email,
      subject: 'Password Changed Successfully ^_^',
      html: resetUserPasswordTemp({ username: user.username }),
    });
    return { msg: 'password has been updated' };
  }
}
