import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'lib/entities/base.entity';

@ObjectType()
export class ActivationCodeEntity extends BaseEntity {
  @Field(() => String)
  code: string;

  @Field(() => String)
  customerId: string;

  @Field(() => Date)
  expirationDate: Date;
}
