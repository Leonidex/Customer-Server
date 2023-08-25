import { Field, InputType } from '@nestjs/graphql';
import { WhereUniqueCustomerInput } from 'src/customer/dto/customer.input';

@InputType()
export class RefreshTokenInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  cursor: WhereUniqueCustomerInput;
}
