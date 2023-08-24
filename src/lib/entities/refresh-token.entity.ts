import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'lib/entities/base.entity';

@ObjectType()
export class RefreshTokenEntity extends BaseEntity {
  @Field(() => String)
  hashedToken: string;

  @Field(() => String)
  customerId: string;

  @Field(() => Date)
  expirationDate: Date;
}
