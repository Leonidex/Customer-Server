import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { PrismaService } from 'src/prisma.service';
import { RefreshTokenResolver } from 'src/refresh-token/refresh-token.resolver';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    CustomerModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || '1h',
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    RefreshTokenService,
    PrismaService,
    RefreshTokenResolver,
    AuthResolver,
  ],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
