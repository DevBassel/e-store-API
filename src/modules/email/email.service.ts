import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfig } from './interfaces/email-config.interface';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_SK,
    },
  });

  async sendEmail(conf: EmailConfig) {
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
