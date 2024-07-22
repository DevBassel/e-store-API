import { PaymentType } from '../enums/payment-type.enum';
export declare class CreateOrderDto {
    paymentMethod: PaymentType;
    shippingAddress: string;
    trackingNumber: string;
    note: string;
    coupon: string;
}
