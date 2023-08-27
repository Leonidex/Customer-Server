import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { CustomerService } from 'src/customer/customer.service';
import { PrismaService } from 'src/prisma.service';
import { VerificationService } from 'src/verification/verification.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  providers: [
    AuthorizationService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    AuthorizationService,
    CustomerService,
    PrismaService,
    VerificationService,
    MailerService,
  ],
})
export class AuthorizationModule {}
