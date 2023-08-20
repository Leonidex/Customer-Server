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

  // async createMany(dataArray: CreateCustomerInput[]): Promise<Customer[]> {
  //   const createOps = dataArray.map((data) =>
  //     this.prisma.customer.create({ data }),
  //   );
  //
  //   return this.prisma.$transaction(createOps);
  // }

  // async findOne(params: FindOneCustomerInput): Promise<Customer | null> {
  //   return this.prisma.customer.findUnique({ ...params });
  // }

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

  // async updateMany(updates: UpdateOneCustomerInput[]): Promise<Customer[]> {
  //   const updateOps = updates.map((update) => {
  //     const { email, password, where } = update;
  //
  //     return this.prisma.customer.update({
  //       where,
  //       data: {
  //         email,
  //         password,
  //       },
  //     });
  //   });
  //
  //   return this.prisma.$transaction(updateOps);
  // }

  async remove(where: WhereCustomerInput): Promise<Customer> {
    return this.prisma.customer.delete({ where });
  }

  // async removeMany(whereArray: WhereCustomerInput[]): Promise<Customer[]> {
  //   const deleteOps = whereArray.map((where) =>
  //     this.prisma.customer.delete({ where }),
  //   );
  //
  //   return this.prisma.$transaction(deleteOps);
  // }
}
