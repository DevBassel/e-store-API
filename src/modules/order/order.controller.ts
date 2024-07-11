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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

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
  findAll(@Req() req: Request & { user: JwtPayload }) {
    return this.orderService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
