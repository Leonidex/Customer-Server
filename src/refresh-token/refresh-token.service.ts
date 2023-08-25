import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { hashString, parseDurationString } from 'lib/utilities';
import { RefreshTokenEntity } from 'lib/entities/refresh-token.entity';
import { RefreshTokenInput } from 'src/refresh-token/dto/refresh-token.input';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { Customer } from '@prisma/client';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  /**
   * Creates a new refresh token.
   * @param payload
   * Returns a new refresh token.
   */
  async createRefreshToken(payload: { sub: string; username: string }) {
    const refreshToken = uuidv4();

    const { value, unit } = parseDurationString(
      process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    );

    const expirationDate = moment().add(value, unit).toDate();
    const hashedToken = await hashString(refreshToken);
    const customerId = payload.sub;

    await this.prisma.refreshToken.create({
      data: {
        hashedToken,
        customerId,
        expirationDate,
      },
    });

    return refreshToken;
  }

  /**
   * Creates a new access token if the refresh token is valid.
   * @param refreshTokenInput
   * Returns a new access token.
   */
  async getNewAccessToken(refreshTokenInput: RefreshTokenInput) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        ...refreshTokenInput.cursor,
      },
    });

    const refreshTokenEntity = await this.fetchRefreshToken(
      refreshTokenInput.token,
      customer,
    );

    if (await this.refreshTokenIsValid(refreshTokenEntity)) {
      const payload = { sub: customer.id, username: customer.email };

      const newRefreshToken = await this.rotateRefreshToken(
        refreshTokenEntity,
        payload,
      );

      const accessToken = await this.jwtService.signAsync({
        ...payload,
        iat: Date.now(),
        jti: uuidv4(),
      });

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
   * @param refreshToken
   * @param customer
   * @private
   * Returns RefreshToken object, or null if none found.
   */
  private async fetchRefreshToken(
    refreshToken: string,
    customer: Customer,
  ): Promise<RefreshTokenEntity> {
    const fetchedTokens = await this.prisma.refreshToken.findMany({
      where: {
        customerId: customer.id,
      },
    });

    const relevantToken = fetchedTokens.find((fetchedToken) => {
      return bcrypt.compareSync(refreshToken, fetchedToken.hashedToken);
    });

    return relevantToken;
  }

  /**
   * Validates a refresh token object.
   * @param refreshTokenEntity
   * Returns a boolean.
   */
  async refreshTokenIsValid(
    refreshTokenEntity: RefreshTokenEntity,
  ): Promise<boolean> {
    if (!refreshTokenEntity) {
      return false;
    }

    if (moment(refreshTokenEntity.expirationDate).isBefore(moment())) {
      return false;
    }
    return true;
  }

  /**
   * Rotates an existing refresh token if it is valid.
   * @param refreshTokenEntity
   * @param payload
   * @private
   * Returns a new refresh token.
   */
  private async rotateRefreshToken(
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
