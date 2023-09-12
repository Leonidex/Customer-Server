import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  FindManyCustomerInput,
  UpdateOneCustomerInput,
  WhereUniqueCustomerInput,
} from './dto/customer.input';
import { CustomerEntity } from 'lib/entities/customer.entity';
import { hashString } from 'lib/utilities';
import { JwtService } from '@nestjs/jwt';
import { Customer, StatusEnum } from '@prisma/client';
import { VerificationService } from 'src/verification/verification.service';
import { SignUpInput } from 'src/authentication/dto/sign-up.input';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}

  async create(credentials: SignUpInput): Promise<CustomerEntity> {
    const { email } = credentials;
    const hashedPassword = await hashString(credentials.password);

    const customer: Customer = await this.prisma.customer.create({
      data: {
        email,
        hashedPassword,
        status: StatusEnum.INITIAL,
      },
    });

    await this.verificationService.createActivationCodeAndSendEmail(customer);

    return customer;
  }

  async findOne(where: WhereUniqueCustomerInput) {
    return this.prisma.customer.findUnique({
      where,
    });
  }

  async findMany(params: FindManyCustomerInput) {
    const {
      where: {
        identifier,
        updatedBefore,
        updatedAfter,
        createdBefore,
        createdAfter,
        ...where
      },
      ...filter
    } = params;

    return this.prisma.customer.findMany({
      ...filter,
      where: {
        ...where,
        ...identifier,
        createdAt: {
          lt: createdBefore,
          gt: createdAfter,
        },
        updatedAt: {
          lt: updatedBefore,
          gt: updatedAfter,
        },
      },
    });
  }

  async update(params: UpdateOneCustomerInput): Promise<CustomerEntity> {
    const {
      customer: { email, password },
      where,
    } = params;

    const hashedPassword = await hashString(password);

    return this.prisma.customer.update({
      where,
      data: { email: email, hashedPassword },
    });
  }

  async remove(where: WhereUniqueCustomerInput): Promise<CustomerEntity> {
    return this.prisma.customer.delete({
      where,
    });
  }
}
