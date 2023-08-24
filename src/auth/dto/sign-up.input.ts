import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
