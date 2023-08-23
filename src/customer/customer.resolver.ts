import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerEntity } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  FindManyCustomerInput,
  UpdateOneCustomerInput,
  WhereCustomerInput,
} from './dto/customer.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver(() => CustomerEntity)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [CustomerEntity])
  async findMany(@Args('filter') filter: FindManyCustomerInput) {
    return this.customerService.findMany(filter);
  }

  @Mutation(() => CustomerEntity)
  async updateOne(@Args('data') update: UpdateOneCustomerInput) {
    return this.customerService.update(update);
  }

  @Mutation(() => CustomerEntity)
  async removeOne(@Args('where') where: WhereCustomerInput) {
    return this.customerService.remove(where);
  }
}
