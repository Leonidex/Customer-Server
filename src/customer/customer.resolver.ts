import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  FindManyCustomerInput,
  UpdateOneCustomerInput,
  WhereCustomerInput,
} from './dto/customer.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, Public } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Public()
  @Mutation(() => Customer)
  async createOne(@Args('customer') customer: CreateCustomerInput) {
    return this.customerService.create(customer);
  }

  @Query(() => [Customer])
  async findMany(@Args('filter') filter: FindManyCustomerInput) {
    return this.customerService.findMany(filter);
  }

  @Mutation(() => Customer)
  async updateOne(@Args('data') update: UpdateOneCustomerInput) {
    return this.customerService.update(update);
  }

  @Mutation(() => Customer)
  async removeOne(@Args('where') where: WhereCustomerInput) {
    return this.customerService.remove(where);
  }
}
