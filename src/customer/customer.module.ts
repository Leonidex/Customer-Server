import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaService } from 'src/prisma.service';
import { CustomerResolver } from './customer.resolver';
import { VerificationModule } from 'src/verification/verification.module';

@Module({
  imports: [VerificationModule],
  providers: [CustomerService, CustomerResolver, PrismaService],
  exports: [CustomerService],
})
export class CustomerModule {}
