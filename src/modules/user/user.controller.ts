import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/strategy/guards/jwt.guard';

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

  @Get(':userId')
  getOneUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOneUser(userId);
  }
}
