import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  customerId: string;
}
