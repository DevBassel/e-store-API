import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Controller('seeding')
export class DbController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  seedig(@Body('count') count: number) {
    if (process.env.NODE_ENV === 'dev') {
      return this.seedingService.seed(count);
    } else throw new BadRequestException('valid in dev mode');
  }
}
