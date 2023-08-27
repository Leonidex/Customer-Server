import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { PrismaService } from 'src/prisma.service';
import { RefreshTokenResolver } from 'src/refresh-token/refresh-token.resolver';

@Module({
  providers: [RefreshTokenService, RefreshTokenResolver, PrismaService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
