import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerEntity } from 'lib/entities/customer.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginOutput } from 'src/auth/dto/login.output';
import { SignUpOutput } from 'src/auth/dto/sign-up.output';
import { SignUpInput } from 'src/auth/dto/sign-up.input';
import { LoginInput } from 'src/auth/dto/login.input';
import { Public } from 'src/auth/auth.guard';

@Resolver(() => CustomerEntity)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => SignUpOutput)
  async signUp(
    @Args('credentials') credentials: SignUpInput,
  ): Promise<SignUpOutput> {
    return this.authService.signUp(credentials);
  }

  @Public()
  @Mutation(() => LoginOutput)
  async login(
    @Args('credentials') credentials: LoginInput,
  ): Promise<LoginOutput> {
    return this.authService.login(credentials);
  }
}
