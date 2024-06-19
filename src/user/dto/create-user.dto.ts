import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 24)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 12)
  phone: string;

  @IsString()
  @Length(6, 16)
  password: string;
}
