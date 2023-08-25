import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerEntity } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  FindManyCustomerInput,
  UpdateOneCustomerInput,
  WhereUniqueCustomerInput,
} from './dto/customer.input';
import { RolesEnum } from '@prisma/client';
import { Roles } from 'src/authorization/authorization.guard';

@Resolver(() => CustomerEntity)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [CustomerEntity])
  async findMany(@Args('filter') filter: FindManyCustomerInput) {
    return this.customerService.findMany(filter);
  }

  @Roles(RolesEnum.ADMIN)
  @Mutation(() => CustomerEntity)
  async updateOne(@Args('data') update: UpdateOneCustomerInput) {
    return this.customerService.update(update);
  }

  @Roles(RolesEnum.ADMIN)
  @Mutation(() => CustomerEntity)
  async removeOne(@Args('where') where: WhereUniqueCustomerInput) {
    return this.customerService.remove(where);
  }
}
