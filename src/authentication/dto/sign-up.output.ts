import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
