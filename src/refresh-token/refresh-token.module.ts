import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [],
  providers: [RefreshTokenService, PrismaService],
})
export class RefreshTokenModule {}
