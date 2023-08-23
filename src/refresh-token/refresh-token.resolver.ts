import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshTokenEntity } from 'lib/entities/refresh-token.entity';
import { RefreshTokenInput } from 'src/refresh-token/dto/refresh-token.input';

@Resolver(() => RefreshTokenEntity)
export class RefreshTokenResolver {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Mutation(() => RefreshTokenEntity)
  async getNewAccessToken(@Args('data') refreshToken: RefreshTokenInput) {
    return this.refreshTokenService.getNewAccessToken(refreshToken);
  }
}
