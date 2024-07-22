import { EmailConfig } from './interfaces/email-config.interface';
export declare class EmailService {
    private transporter;
    sendEmail(conf: EmailConfig): Promise<void>;
}
