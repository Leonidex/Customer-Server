import {
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomerInput,
  FindAllCustomerInput,
  UpdateOneCustomerInput,
  WhereCustomerInput,
} from './dto/customer.input';
import { Customer } from 'lib/entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomerInput): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async findMany(params: FindAllCustomerInput) {
    return this.prisma.customer.findMany({ ...params });
  }

  async update(params: UpdateOneCustomerInput): Promise<Customer> {
    const { customer, where } = params;

    return this.prisma.customer.update({
      where,
      data: customer,
    });
  }

  async remove(where: WhereCustomerInput): Promise<Customer> {
    return this.prisma.customer.delete({ where });
  }
}
