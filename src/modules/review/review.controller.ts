import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.reviewService.create(createReviewDto, req.user);
  }

  @Get(':id')
  findAll(
    @Param('id') productId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.reviewService.findAll(productId, page, limit);
  }

  @Get(':id/view')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string, @Req() req: Request & { user: JwtPayload }) {
    return this.reviewService.remove(+id, req.user);
  }
}
