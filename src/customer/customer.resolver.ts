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
  async createOne(@Args('data') customer: CreateCustomerInput) {
    return this.customerService.create(customer);
  }

  // @Query(() => [Customer])
  // async createMany(@Args('data') dataArray: CreateCustomerInput[]) {
  //   return this.customerService.createMany(dataArray);
  // }

  // @Query(() => Customer)
  // async findOne(@Args('data') { where }: FindOneCustomerInput) {
  //   return this.customerService.findOne({ where });
  // }

  @Query(() => [Customer])
  async findAll(@Args('data') filter: FindAllCustomerInput) {
    return this.customerService.findAll(filter);
  }

  // @Query(() => [Customer])
  // async updateMany(@Args('data') updates: UpdateOneCustomerInput[]) {
  //   return this.customerService.updateMany(updates);
  // }

  @Mutation(() => Customer)
  async updateOne(@Args('data') update: UpdateOneCustomerInput) {
    return this.customerService.update(update);
  }

  @Mutation(() => Customer)
  async removeOne(@Args('data') where: WhereCustomerInput) {
    return this.customerService.remove(where);
  }
}
