import { ConflictException, Injectable, RawBodyRequest } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';
import { PaymentStatus } from '../order/enums/payment-status.enum';

@Injectable()
export class PaymenyService {
  stripe: Stripe;
  constructor(
    private readonly config: ConfigService,
    private readonly orderService: OrderService,
  ) {
    this.stripe = new Stripe(config.getOrThrow('STRIPE_SK'));
  }
  async createPayment(orderId: number) {
    const order = await this.orderService.findOne(orderId);
    if (order.paymentStatus === PaymentStatus.DONE)
      throw new ConflictException('order has been paid');
    console.log(order);
    const intent = await this.stripe.paymentIntents.create({
      amount: order.total * 100, // 100 == 1$
      currency: 'USD',
      metadata: {
        orderId: orderId,
      },
    });
    console.log(intent.client_secret);
    return intent.client_secret;
  }

  async webHook(req: RawBodyRequest<Request>) {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        this.config.getOrThrow('STRIPE_WEEBHOOK_SK'),
      );
      // console.log({ event });
    } catch (err) {
      console.log(err);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'setup_intent.succeeded':
        const payment = event.data.object;
        const orderId = +payment.metadata.orderId;
        const order = await this.orderService.update(orderId, {
          paymentStatus: PaymentStatus.DONE,
        });
        console.log({ payment, order });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return;
  }
}
