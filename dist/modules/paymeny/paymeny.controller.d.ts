import { RawBodyRequest } from '@nestjs/common';
import { PaymenyService } from './paymeny.service';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
export declare class PaymenyController {
    private readonly paymenyService;
    constructor(paymenyService: PaymenyService);
    createPayment(orderId: number, req: Request & {
        user: JwtPayload;
    }): Promise<string>;
    webHook(req: RawBodyRequest<Request>): Promise<void>;
}
