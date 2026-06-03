import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfig } from './interfaces/email-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {}
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.config.getOrThrow('EMAIL_USER'),
      pass: this.config.getOrThrow('EMAIL_SK'),
    },
  });

  async sendEmail(conf: EmailConfig) {
    if (this.config.get('NODE_ENV') === 'dev') console.log(conf);
    else
      this.transporter.sendMail(
        {
          from: process.env.EMAIL_USER,
          ...conf,
        },
        (err, info) => {
          if (err) console.log(err);
          console.log({ info });
        },
      );
  }
}
