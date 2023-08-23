import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomerInput,
  FindManyCustomerInput,
  FindOneCustomerInput,
  UpdateOneCustomerInput,
  WhereCustomerInput,
} from './dto/customer.input';
import { Customer } from 'lib/entities/customer.entity';
import { hashString } from 'lib/utilities';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomerInput): Promise<Customer> {
    const { email } = data;
    const hashedPassword = await hashString(data.password);
    return this.prisma.customer.create({
      data: {
        email,
        hashedPassword: hashedPassword,
      },
    });
  }

  async findOne(params: FindOneCustomerInput) {
    return this.prisma.customer.findUnique({ ...params });
  }

  async findMany(params: FindManyCustomerInput) {
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
