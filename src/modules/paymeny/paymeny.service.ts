import { ConflictException, Injectable, RawBodyRequest } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';
import { PaymentStatus } from '../order/enums/payment-status.enum';
import { ProductsService } from '../products/products.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { OrderStatus } from '../order/enums/order-status.enum';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class PaymenyService {
  stripe: Stripe;
  constructor(
    private readonly config: ConfigService,
    private readonly orderService: OrderService,
    private readonly productService: ProductsService,
    private readonly couponService: CouponsService,
  ) {
    this.stripe = new Stripe(config.getOrThrow('STRIPE_SK'));
  }
  async createPayment(orderId: number, user: JwtPayload) {
    const order = await this.orderService.findOne(orderId, user);

    // check order isDone
    if (order.paymentStatus === PaymentStatus.DONE)
      throw new ConflictException('order has been paid');

    const coupon = await this.couponService.validateCoupon(order.coupon);
    const price = coupon
      ? order.total - (order.total * coupon.discount) / 100
      : order.total;

    // console.log(order);
    console.log({
      coupon,
      price,
      order,
    });
    // create payment
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(price * 100), // Stripe requires amount in cents as an integer
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
        console.log('success');
        // update order if success
        const successOrder = await this.orderService.update(
          orderId,
          {
            paymentStatus: PaymentStatus.DONE,
            status: OrderStatus.SHIPING,
            paymentIntentId: payment.id,
          },
          user,
        );

        // update items stock
        await Promise.all(
          successOrder.items.map(async (item) => {
            const product = await this.productService.findOne(item.productId);
            await this.productService.update(item.productId, {
              stock: product.stock - item.quantity,
            });
          }),
        );

        break;
      case 'payment_intent.canceled':
        // update order if cancel
        await this.orderService.update(
          orderId,
          {
            paymentStatus: PaymentStatus.CANCEL,
            status: OrderStatus.CANCEL,
            paymentIntentId: payment.id,
          },
          user,
        );
        break;
      case 'payment_intent.payment_failed':
        console.log('failed');

        await this.orderService.update(
          orderId,
          {
            paymentStatus: PaymentStatus.FAILED,
            status: OrderStatus.PENDING,
            paymentIntentId: payment.id,
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
