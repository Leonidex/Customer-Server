import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { LoginOutput } from 'src/auth/dto/login.output';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async login(email: string, password: string): Promise<LoginOutput> {
    const customer = await this.customerService.findOne({ where: { email } });

    // Might want to throw UnauthorizedException instead, for security purposes
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (!(await bcrypt.compare(password, customer?.hashedPassword))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: customer.id, username: customer.email };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      payload,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Registers a new customer to the system.
   * @param email
   * @param password
   * Returns access and refresh tokens.
   */
  async signUp(email: string, password: string): Promise<LoginOutput> {
    if (await this.customerService.findOne({ where: { email } })) {
      throw new ConflictException('Customer already exists');
    }

    const customerEntity = await this.customerService.create({
      email,
      password,
    });

    if (customerEntity) {
      return this.login(email, password);
    }
  }
}
