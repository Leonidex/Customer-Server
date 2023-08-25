import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { PrismaService } from 'src/prisma.service';
import { AuthenticationResolver } from './authentication.resolver';
import { VerificationModule } from 'src/verification/verification.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || '1h',
      },
    }),
    CustomerModule,
    VerificationModule,
    RefreshTokenModule,
  ],
  providers: [
    AuthenticationService,
    AuthenticationResolver,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    PrismaService,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
