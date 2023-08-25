import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum RequestStatusEnum {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

registerEnumType(RequestStatusEnum, {
  name: 'RequestStatusEnum',
});

@ObjectType()
export class RequestStatusOutput {
  @Field(() => RequestStatusEnum, { defaultValue: RequestStatusEnum.FAILURE })
  status: RequestStatusEnum;
}
