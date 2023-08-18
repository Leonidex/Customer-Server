import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCustomerInput } from './dto/customer.input';
import { Customer } from 'lib/entities/customer.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async createMany(
    dataArray: Prisma.CustomerCreateManyInput[],
  ): Promise<Customer[]> {
    const createOps = dataArray.map((data) =>
      this.prisma.customer.create({ data }),
    );

    return this.prisma.$transaction(createOps);
  }

  async findOne(
    where: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where });
  }

  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async update(
    where: Prisma.CustomerWhereUniqueInput,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return this.prisma.customer.update({
      where,
      data,
    });
  }

  async updateMany(
    updates: {
      where: Prisma.CustomerWhereUniqueInput;
      data: Prisma.CustomerUpdateInput;
    }[],
  ): Promise<Customer[]> {
    const updateOps = updates.map((update) =>
      this.prisma.customer.update({
        where: update.where,
        data: update.data,
      }),
    );

    return this.prisma.$transaction(updateOps);
  }

  async remove(where: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    return this.prisma.customer.delete({ where });
  }

  async removeMany(
    whereArray: Prisma.CustomerWhereUniqueInput[],
  ): Promise<Customer[]> {
    const deleteOps = whereArray.map((where) =>
      this.prisma.customer.delete({ where }),
    );

    return this.prisma.$transaction(deleteOps);
  }
}
