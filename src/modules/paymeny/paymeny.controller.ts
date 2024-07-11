import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymenyService } from './paymeny.service';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('paymenys')
@ApiTags('Payment')
export class PaymenyController {
  constructor(private readonly paymenyService: PaymenyService) {}
  @UseGuards(JwtGuard)
  @Post('create')
  createPayment(@Body('orderId', ParseIntPipe) orderId: number) {
    return this.paymenyService.createPayment(orderId);
  }

  @Post('webhook')
  webHook(@Req() req: RawBodyRequest<Request>) {
    return this.paymenyService.webHook(req);
  }
}
