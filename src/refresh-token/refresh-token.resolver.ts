import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshTokenEntity } from 'lib/entities/refresh-token.entity';
import { RefreshTokenInput } from 'src/refresh-token/dto/refresh-token.input';
import { LoginOutput } from 'src/authentication/dto/login.output';
import { Public } from 'lib/decorators/public.decorator';

@Resolver(() => RefreshTokenEntity)
export class RefreshTokenResolver {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Public()
  @Mutation(() => LoginOutput)
  async getNewAccessToken(@Args('data') refreshToken: RefreshTokenInput) {
    return this.refreshTokenService.getNewAccessToken(refreshToken);
  }
}
