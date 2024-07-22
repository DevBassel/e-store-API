import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { OrderStatus } from './enums/order-status.enum';

@UseGuards(JwtGuard)
@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.orderService.create(createOrderDto, req.user);
  }

  @Get()
  findAll(
    @Req() req: Request & { user: JwtPayload },
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status: OrderStatus,
  ) {
    return this.orderService.findAll(req.user, page, limit, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request & { user: JwtPayload }) {
    return this.orderService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    delete updateOrderDto.paymentStatus;
    console.log({ updateOrderDto });
    return this.orderService.update(+id, updateOrderDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: JwtPayload }) {
    return this.orderService.cancel(+id, req.user);
  }
}
