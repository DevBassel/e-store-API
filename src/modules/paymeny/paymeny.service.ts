import { ConflictException, Injectable, RawBodyRequest } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';
import { PaymentStatus } from '../order/enums/payment-status.enum';
import { ProductsService } from '../products/products.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { OrderStatus } from '../order/enums/order-status.enum';

@Injectable()
export class PaymenyService {
  stripe: Stripe;
  constructor(
    private readonly config: ConfigService,
    private readonly orderService: OrderService,
    private readonly productService: ProductsService,
  ) {
    this.stripe = new Stripe(config.getOrThrow('STRIPE_SK'));
  }
  async createPayment(orderId: number, user: JwtPayload) {
    const order = await this.orderService.findOne(orderId, user);

    // check order isDone
    if (order.paymentStatus === PaymentStatus.DONE)
      throw new ConflictException('order has been paid');

    // console.log(order);

    // create payment
    const intent = await this.stripe.paymentIntents.create({
      amount: order.total * 100, // 100 == 1$
      currency: 'USD',
      metadata: {
        orderId: orderId,
        user: JSON.stringify(user),
      },
    });
    // console.log(intent.client_secret);
    return intent.client_secret;
  }

  async webHook(req: RawBodyRequest<Request>, sig: string) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEEBHOOK_SK,
      );
      // console.log({ event });
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      console.log(err);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const payment = event.data.object;
        const orderId = +payment.metadata.orderId;
        const user = JSON.parse(payment.metadata.user);

        // update order if success
        const successOrder = await this.orderService.update(
          orderId,
          {
            paymentStatus: PaymentStatus.DONE,
            status: OrderStatus.PENDING,
          },
          user,
        );

        // update items stock
        successOrder.items.forEach(async (item) => {
          const product = await this.productService.findOne(item.productId);
          await this.productService.update(item.productId, {
            stock: product.stock - item.quantity,
          });
        });

        break;
      case 'payment_intent.canceled':
        // update order if cancel
        await this.orderService.update(
          orderId,
          {
            paymentStatus: PaymentStatus.CANCEL,
            status: OrderStatus.CANCEL,
          },
          user,
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return;
  }
}
