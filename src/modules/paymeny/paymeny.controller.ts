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
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../auth/dto/jwt-payload';

@Controller('paymenys')
@ApiTags('Payment')
export class PaymenyController {
  constructor(private readonly paymenyService: PaymenyService) {}
  @UseGuards(JwtGuard)
  @Post('create')
  createPayment(
    @Body('orderId', ParseIntPipe) orderId: number,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.paymenyService.createPayment(orderId, req.user);
  }

  @Post('webhook')
  @ApiExcludeEndpoint()
  webHook(@Req() req: RawBodyRequest<Request>) {
    return this.paymenyService.webHook(req);
  }
}
