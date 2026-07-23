import {
  BadRequestException,
  ConflictException,
  Injectable,
  RawBodyRequest,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';
import { PaymentStatus } from '../order/enums/payment-status.enum';
import { ProductsService } from '../products/products.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { OrderStatus } from '../order/enums/order-status.enum';
import { CouponsService } from '../coupons/coupons.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { PaymentType } from '../order/enums/payment-type.enum';

@Injectable()
export class PaymentService {
  stripe: Stripe;
  constructor(
    private readonly config: ConfigService,
    private readonly orderService: OrderService,
    private readonly productService: ProductsService,
    private readonly couponService: CouponsService,
  ) {
    this.stripe = new Stripe(config.getOrThrow('STRIPE_SK'));
  }
  async createPayment(dto: CreatePaymentDto, user: JwtPayload) {
    const order = await this.orderService.findOne(dto.orderId, user);

    if (order.paymentMethod !== PaymentType.CARDE)
      throw new BadRequestException('this order will pay cash !!');

    // check order isDone
    if (order.paymentStatus === PaymentStatus.DONE)
      throw new ConflictException('order has been paid !!');

    const coupon =
      dto.coupon && (await this.couponService.validateCoupon(dto.coupon));

    const price = coupon
      ? order.total - (order.total * coupon.discount) / 100
      : order.total;

    if (coupon) {
      await this.orderService.update(
        dto.orderId,
        { couponId: coupon.id },
        user,
      );
    }

    // create payment
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(price * 100), // Stripe requires amount in cents as an integer
      currency: 'USD',
      metadata: {
        orderId: dto.orderId,
        user: JSON.stringify(user),
      },
    });
    // console.log(intent.client_secret);
    return intent.client_secret;
  }

  async webHook(req: RawBodyRequest<Request>, sig: string) {
    let event: Stripe.Event;
    console.log('hook');
    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEEBHOOK_SK,
      );
      // console.log({ event });
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      console.log(err);
      return;
    }

    const payment = event.data.object as Stripe.PaymentIntent;
    const orderId = +payment.metadata.orderId;
    const user = JSON.parse(payment.metadata.user);
    // Handle the event

    console.log(payment.id);
    switch (event.type) {
      case 'payment_intent.created':
        console.log('create');
        break;
      case 'payment_intent.succeeded':
        return await this.successPayment(orderId, user, payment);
      case 'payment_intent.canceled':
        return await this.canceledPayment(orderId, user, payment);
      case 'payment_intent.payment_failed':
        return await this.failedPayment(orderId, user, payment);

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return;
  }

  private async successPayment(
    orderId: number,
    user: JwtPayload,
    payment: Stripe.PaymentIntent,
  ) {
    console.log('success');
    // update order if success
    const successOrder = await this.orderService.orderPayed(
      orderId,
      payment.id,
      payment.amount,
      user,
    );

    // update items stock
    return await Promise.all(
      successOrder.items.map(async (item) => {
        const product = await this.productService.findOne(item.productId);
        await this.productService.update(item.productId, {
          stock: product.stock - item.quantity,
        });
      }),
    );
  }

  private async canceledPayment(
    orderId: number,
    user: JwtPayload,
    payment: Stripe.PaymentIntent,
  ) {
    return await this.orderService.update(
      orderId,
      {
        paymentStatus: PaymentStatus.CANCEL,
        status: OrderStatus.CANCEL,
        paymentIntentId: payment.id,
      },
      user,
    );
  }

  private async failedPayment(
    orderId: number,
    user: JwtPayload,
    payment: Stripe.PaymentIntent,
  ) {
    console.log('failed');

    return await this.orderService.update(
      orderId,
      {
        paymentStatus: PaymentStatus.FAILED,
        status: OrderStatus.PENDING,
        paymentIntentId: payment.id,
      },
      user,
    );
  }
}
