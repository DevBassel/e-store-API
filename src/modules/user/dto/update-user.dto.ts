import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';

export class UpdateProfileDto extends PartialType(CreateUserDto) {
  @Exclude()
  password?: string;
}
