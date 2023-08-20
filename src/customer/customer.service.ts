import { Injectable } from '@nestjs/common';
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

  async findAll(params: FindAllCustomerInput) {
    return this.prisma.customer.findMany({ ...params });
  }

  async update(params: UpdateOneCustomerInput): Promise<Customer> {
    const { email, password, where } = params;

    return this.prisma.customer.update({
      where,
      data: {
        email,
        password,
      },
    });
  }

  async remove(where: WhereCustomerInput): Promise<Customer> {
    return this.prisma.customer.delete({ where });
  }
}
