import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { hashString } from 'lib/utilities';
import { RefreshTokenEntity } from 'lib/entities/refresh-token.entity';
import { RefreshTokenInput } from 'src/refresh-token/dto/refresh-token.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async createRefreshToken(payload: { sub: string; username: string }) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME || '30d',
    });

    this.prisma.refreshToken.create({
      data: {
        hashedToken: await hashString(refreshToken),
        customerId: payload.sub,
      },
    });

    return refreshToken;
  }

  async getNewAccessToken(refreshTokenInput: RefreshTokenInput) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: refreshTokenInput.customerId,
      },
    });

    const refreshTokenEntity = await this.fetchRefreshToken(refreshTokenInput);

    if (await this.refreshTokenIsValid(refreshTokenEntity)) {
      const payload = { sub: customer.id, username: customer.email };

      const newRefreshToken = this.replaceRefreshToken(
        refreshTokenEntity,
        payload,
      );
      const accessToken = this.jwtService.signAsync(payload);
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * Fetches a refresh token object from the database.
   * @param refreshTokenInput
   * @private
   * Returns RefreshToken object, or null if none found.
   */
  private async fetchRefreshToken(
    refreshTokenInput: RefreshTokenInput,
  ): Promise<RefreshTokenEntity> {
    const fetchedTokens = await this.prisma.refreshToken.findMany({
      where: {
        customerId: refreshTokenInput.customerId,
      },
    });

    const relevantToken = fetchedTokens.find(async (fetchedToken) => {
      return await bcrypt.compare(
        refreshTokenInput.token,
        fetchedToken.hashedToken,
      );
    });

    return relevantToken;
  }

  /**
   * Validates a refresh token object.
   * @param refreshTokenEntity
   */
  async refreshTokenIsValid(
    refreshTokenEntity: RefreshTokenEntity,
  ): Promise<boolean> {
    return !!refreshTokenEntity;
  }

  private async replaceRefreshToken(
    refreshTokenEntity: RefreshTokenEntity,
    payload: { sub: string; username: string },
  ) {
    await this.prisma.refreshToken.delete({
      where: {
        id: refreshTokenEntity.id,
      },
    });

    return await this.createRefreshToken(payload);
  }
}
