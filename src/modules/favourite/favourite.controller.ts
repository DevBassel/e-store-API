import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('favourite')
@UseGuards(JwtGuard)
@ApiTags('Favourites')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post()
  create(
    @Body() createFavouriteDto: CreateFavouriteDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.favouriteService.create(createFavouriteDto, req.user);
  }

  @Get()
  findAll(@Req() req: Request & { user: JwtPayload }) {
    return this.favouriteService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favouriteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: JwtPayload }) {
    return this.favouriteService.remove(+id, req.user);
  }
}
