import { Module } from '@nestjs/common';
import { VerificationService } from 'src/verification/verification.service';
import { VerificationResolver } from 'src/verification/verification.resolver';
import { PrismaService } from 'src/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  providers: [
    VerificationService,
    VerificationResolver,
    PrismaService,
    MailerService,
  ],
  exports: [VerificationService],
})
export class VerificationModule {}
