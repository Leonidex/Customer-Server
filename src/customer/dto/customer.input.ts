import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class WhereCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateCustomerInput {
  @Field(() => String, {})
  email: string;

  @Field(() => String, {})
  password: string;
}

@InputType()
export class FindOneCustomerInput {
  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class FindManyCustomerInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class UpdateOneCustomerInput {
  @Field(() => CreateCustomerInput, { nullable: true })
  customer?: CreateCustomerInput;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}
