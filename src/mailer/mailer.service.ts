import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as Mailgun from 'nodemailer-mailgun-transport';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    this.transporter = nodemailer.createTransport(Mailgun(auth));
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.MAILGUN_SENDER_EMAIL,
      to: to,
      subject: subject,
      text: text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
