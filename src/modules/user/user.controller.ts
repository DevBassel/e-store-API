import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/strategy/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { UpdateProfileDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAllUsers(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
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
