import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WhereUniqueCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}

@InputType()
export class WhereCustomerInput {
  @Field(() => WhereUniqueCustomerInput, { nullable: true })
  identifier?: WhereUniqueCustomerInput;

  @Field(() => Date, { nullable: true })
  createdBefore?: Date;

  @Field(() => Date, { nullable: true })
  updatedBefore?: Date;

  @Field(() => Date, { nullable: true })
  createdAfter?: Date;

  @Field(() => Date, { nullable: true })
  updatedAfter?: Date;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;
}

@InputType()
export class FindManyCustomerInput {
  @Field(() => WhereUniqueCustomerInput, { nullable: true })
  cursor?: WhereUniqueCustomerInput;

  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => WhereCustomerInput)
  where: WhereCustomerInput;
}

@InputType()
export class UpdateOneCustomerInput {
  @Field(() => UpdateCustomerInput)
  customer?: UpdateCustomerInput;

  @Field(() => WhereUniqueCustomerInput, { nullable: true })
  where: WhereUniqueCustomerInput;
}
