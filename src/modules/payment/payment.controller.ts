import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CreatePaymentDto } from './dto/createPayment.dto';

@Controller('payments')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymenyService: PaymentService) {}
  @UseGuards(JwtGuard)
  @Post('create')
  createPayment(
    @Body() dto: CreatePaymentDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.paymenyService.createPayment(dto, req.user);
  }

  @Post('webhook')
  @ApiExcludeEndpoint()
  webHook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    return this.paymenyService.webHook(req, sig);
  }
}
