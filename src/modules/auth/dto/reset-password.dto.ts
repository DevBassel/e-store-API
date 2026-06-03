import { IsString, Length } from 'class-validator';

export class ResetPasswordForgotDto {
  @IsString()
  @Length(6, 16)
  newPassword: string;
  @IsString()
  token: string;
}

export class ResetPasswordUserDto {
  @IsString()
  @Length(6, 16)
  password?: string;

  @IsString()
  @Length(6, 16)
  newPassword: string;
}
