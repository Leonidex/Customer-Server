import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { hashString } from 'lib/utilities';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async createRefreshToken(
    customerId: string,
    payload: { sub: string; username: string },
  ) {
    const refreshToken = await this.jwtService.signAsync(payload);

    this.prisma.refreshToken.create({
      data: {
        hashedToken: await hashString(refreshToken),
        customerId: customerId,
      },
    });

    return refreshToken;
  }
}
