import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

@Controller('seeding')
@ApiExcludeController()
@ApiTags('db dev mode faker ')
export class DbController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  seedig(@Body('count') count: number) {
    if (process.env.NODE_ENV === 'dev') {
      return this.seedingService.seed(count);
    } else throw new BadRequestException('valid in dev mode');
  }

  @Post('clear')
  clear() {
    if (process.env.NODE_ENV === 'dev') {
      return this.seedingService.clear();
    } else throw new BadRequestException('valid in dev mode');
  }
}
