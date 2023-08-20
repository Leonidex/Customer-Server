import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  FindAllCustomerInput,
  UpdateOneCustomerInput,
  WhereCustomerInput,
} from './dto/customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => Customer)
  async createOne(@Args('customer') customer: CreateCustomerInput) {
    return this.customerService.create(customer);
  }

  @Query(() => [Customer])
  async findMany(@Args('filter') filter: FindAllCustomerInput) {
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
