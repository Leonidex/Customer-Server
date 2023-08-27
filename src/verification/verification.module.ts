import { Module } from '@nestjs/common';
import { VerificationService } from 'src/verification/verification.service';
import { VerificationResolver } from 'src/verification/verification.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [VerificationService, VerificationResolver, PrismaService],
  exports: [VerificationService],
})
export class VerificationModule {}
