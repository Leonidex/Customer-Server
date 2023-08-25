import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerEntity } from 'lib/entities/customer.entity';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { LoginOutput } from 'src/authentication/dto/login.output';
import { SignUpOutput } from 'src/authentication/dto/sign-up.output';
import { SignUpInput } from 'src/authentication/dto/sign-up.input';
import { LoginInput } from 'src/authentication/dto/login.input';
import { Public } from 'src/authentication/authentication.guard';

@Resolver(() => CustomerEntity)
export class AuthenticationResolver {
  constructor(private authService: AuthenticationService) {}

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
