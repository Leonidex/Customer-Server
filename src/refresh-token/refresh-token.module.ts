import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenController } from './refresh-token.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService, PrismaService],
})
export class RefreshTokenModule {}
