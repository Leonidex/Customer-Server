import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RequestStatusOutput } from 'lib/dto/request-status.output';
import { VerificationService } from 'src/verification/verification.service';
import { ActivateOneCustomerInput } from 'src/verification/dto/verification.input';
import { ActivationCodeEntity } from 'lib/entities/activation-code.entity';

@Resolver()
export class VerificationResolver {
  constructor(private verificationService: VerificationService) {}
  @Mutation(() => RequestStatusOutput)
  async activateCustomer(@Args('data') data: ActivateOneCustomerInput) {
    return this.verificationService.activateCustomer(data);
  }

  @Mutation(() => ActivationCodeEntity)
  async regenerateActivationCode(@Context() context: any) {
    const {
      req: {
        user: { sub },
      },
    } = context;
    return this.verificationService.regenerateActivationCode(sub);
  }
}
