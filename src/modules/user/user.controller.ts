import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { UpdateProfileDto } from './dto/update-user.dto';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('users')
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Roles(Role.ADMIN)
  getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.userService.getAllUsers(page, limit);
  }

  @Get('profile')
  getProfile(@Req() req: Request & { user: JwtPayload }) {
    return this.userService.getProfile(req.user);
  }

  @Patch('profile')
  updateProfile(
    @Body() updateUserDto: UpdateProfileDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.userService.updateProfile(updateUserDto, req.user);
  }

  @Get('find/:userId')
  getOneUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOneUser(userId);
  }
}
