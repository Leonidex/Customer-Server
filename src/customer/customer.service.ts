import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomerInput,
  FindManyCustomerInput,
  UpdateOneCustomerInput,
  WhereUniqueCustomerInput,
} from './dto/customer.input';
import { CustomerEntity } from 'lib/entities/customer.entity';
import { hashString } from 'lib/utilities';
import { JwtService } from '@nestjs/jwt';
import { Customer, StatusEnum } from '@prisma/client';
import { VerificationService } from 'src/verification/verification.service';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}

  async create(credentials: CreateCustomerInput): Promise<CustomerEntity> {
    const { email } = credentials;
    const hashedPassword = await hashString(credentials.password);

    const customer: Customer = await this.prisma.customer.create({
      data: {
        email,
        hashedPassword,
        status: StatusEnum.INITIAL,
      },
    });

    await this.verificationService.createActivationCode(customer);

    return customer;
  }

  async findOne(where: WhereUniqueCustomerInput) {
    return this.prisma.customer.findUnique({
      where,
    });
  }

  async findMany(params: FindManyCustomerInput) {
    const {
      where: { identifier, ...where },
      ...filter
    } = params;

    return this.prisma.customer.findMany({
      ...filter,
      where: {
        ...where,
        ...identifier,
      },
    });
  }

  async update(params: UpdateOneCustomerInput): Promise<CustomerEntity> {
    const {
      customer,
      where: { identifier, ...where },
    } = params;

    return this.prisma.customer.update({
      where: {
        ...where,
        ...identifier,
      },
      data: customer,
    });
  }

  async remove(where: WhereUniqueCustomerInput): Promise<CustomerEntity> {
    return this.prisma.customer.delete({
      where,
    });
  }
}
