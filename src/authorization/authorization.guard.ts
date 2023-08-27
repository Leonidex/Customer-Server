import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Customer, RolesEnum } from '@prisma/client';
import { CustomerService } from 'src/customer/customer.service';
import { getRequestFromContext } from 'lib/utilities';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private customerService: CustomerService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!allowedRoles) {
      return true;
    }

    const request = getRequestFromContext(context);
    const customerId = request.user.sub;

    const customer: Customer = await this.customerService.findOne({
      id: customerId,
    });
    return allowedRoles.includes(customer.role);
  }
}
