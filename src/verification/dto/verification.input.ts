import { Field, InputType } from '@nestjs/graphql';
import { WhereCustomerInput } from 'src/customer/dto/customer.input';

@InputType()
export class ActivateOneCustomerInput {
  @Field(() => WhereCustomerInput)
  where: WhereCustomerInput;

  @Field(() => String)
  activationCode: string;
}
