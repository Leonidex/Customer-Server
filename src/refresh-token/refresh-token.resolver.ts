import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshTokenEntity } from 'lib/entities/refresh-token.entity';
import { RefreshTokenInput } from 'src/refresh-token/dto/refresh-token.input';

@UseGuards(AuthGuard)
@Resolver(() => RefreshTokenEntity)
export class RefreshTokenResolver {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Mutation(() => RefreshTokenEntity)
  async getNewAccessToken(@Args('data') refreshToken: RefreshTokenInput) {
    return this.refreshTokenService.getNewAccessToken(refreshToken);
  }
}
