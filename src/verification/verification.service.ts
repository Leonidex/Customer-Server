import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import {
  ActivateOneCustomerInput,
  DeactivateOneCustomerInput,
} from 'src/verification/dto/verification.input';
import { PrismaService } from 'src/prisma.service';
import { ActivationCode, Customer, StatusEnum } from '@prisma/client';
import * as moment from 'moment/moment';
import {
  RequestStatusEnum,
  RequestStatusOutput,
} from 'lib/dto/request-status.output';
import { ActivationCodeEntity } from 'lib/entities/activation-code.entity';
import { parseDurationString } from 'lib/utilities';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class VerificationService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async createActivationCodeAndSendEmail(customer: Customer) {
    const activationCode = await this.createActivationCode(customer);
    await this.mailerService.sendEmail(
      customer.email,
      'Hello there',
      `This is your activation code!\n${activationCode.code}`,
    );

    return activationCode;
  }

  async createActivationCode(customer: Customer) {
    const code = await this.jwtService.signAsync({
      user: customer.email,
      iat: Date.now(),
      jti: uuidv4(),
    });

    const { value, unit } = parseDurationString(
      process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    );

    const expirationDate = moment().add(value, unit).toDate();

    return this.prismaService.activationCode.create({
      data: {
        customerId: customer.id,
        code,
        expirationDate,
      } as ActivationCodeEntity,
    });
  }

  async regenerateActivationCode(
    customerId: string,
  ): Promise<ActivationCodeEntity> {
    const customer: Customer = await this.prismaService.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (customer.status === StatusEnum.INITIAL) {
      await this.prismaService.activationCode.deleteMany({
        where: {
          customerId,
        },
      });

      return await this.createActivationCodeAndSendEmail(customer);
    } else {
      throw new BadRequestException('Customer already activated');
    }
  }

  /**
   * Activates the user by changing its status in the database,
   * if the given activation is valid.
   * @param data
   * Returns status object.
   */
  async activateCustomer(
    data: ActivateOneCustomerInput,
  ): Promise<RequestStatusOutput> {
    const customer: Customer = await this.prismaService.customer.findUnique({
      where: data.where,
    });

    const activationCode: ActivationCode =
      await this.prismaService.activationCode.findUnique({
        where: {
          customerId: customer.id,
        },
      });

    if (
      activationCode?.code === data.activationCode &&
      !moment(activationCode.expirationDate).isBefore(moment())
    ) {
      await this.prismaService.customer.update({
        where: {
          id: customer.id,
        },
        data: { ...customer, status: StatusEnum.VERIFIED },
      });

      await this.prismaService.activationCode.delete({
        where: {
          id: activationCode.id,
        },
      });

      return {
        status: RequestStatusEnum.SUCCESS,
      };
    } else {
      throw new BadRequestException('Invalid activation code');
    }
  }

  async deactivateCustomer(data: DeactivateOneCustomerInput) {
    const customer: Customer = await this.prismaService.customer.findUnique({
      where: data.where,
    });

    if (customer) {
      await this.prismaService.customer.update({
        where: {
          id: customer.id,
        },
        data: { ...customer, status: StatusEnum.DEACTIVATED },
      });

      return {
        status: RequestStatusEnum.SUCCESS,
      };
    } else {
      throw new NotFoundException('Customer not found');
    }
  }
}
