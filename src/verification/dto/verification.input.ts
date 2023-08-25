import { Field, InputType } from '@nestjs/graphql';
import { WhereUniqueCustomerInput } from 'src/customer/dto/customer.input';

@InputType()
export class ActivateOneCustomerInput {
  @Field(() => WhereUniqueCustomerInput)
  where: WhereUniqueCustomerInput;

  @Field(() => String)
  activationCode: string;
}
