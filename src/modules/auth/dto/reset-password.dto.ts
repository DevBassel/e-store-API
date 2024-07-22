import { IsString, Length } from 'class-validator';

export class ResetPasswordEmailDto {
  @IsString()
  @Length(6, 16)
  newPassword: string;
}

export class ResetPasswordUserDto {
  @IsString()
  @Length(6, 16)
  password?: string;

  @IsString()
  @Length(6, 16)
  newPassword: string;
}
