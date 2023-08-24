import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'lib/entities/base.entity';

@ObjectType()
export class CustomerEntity extends BaseEntity {
  @Field(() => String)
  email: string;
}
