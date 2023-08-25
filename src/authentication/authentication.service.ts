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
import { LoginOutput } from 'src/authentication/dto/login.output';
import { LoginInput } from 'src/authentication/dto/login.input';
import { SignUpInput } from 'src/authentication/dto/sign-up.input';
import { SignUpOutput } from 'src/authentication/dto/sign-up.output';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthenticationService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async login(credentials: LoginInput): Promise<LoginOutput> {
    const customer = await this.customerService.findOne({
      email: credentials.email,
    });

    // Might want to throw UnauthorizedException instead, for security purposes
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (
      !(await bcrypt.compare(credentials.password, customer?.hashedPassword))
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: customer.id, username: customer.email };

    const accessToken = await this.jwtService.signAsync({
      ...payload,
      iat: Date.now(),
      jti: uuidv4(),
    });
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
   * Returns access and refresh tokens.
   * @param credentials
   */
  async signUp(credentials: SignUpInput): Promise<SignUpOutput> {
    if (
      await this.customerService.findOne({
        email: credentials.email,
      })
    ) {
      throw new ConflictException('Customer already exists');
    }

    const customerEntity = await this.customerService.create({
      email: credentials.email,
      password: credentials.password,
    });

    if (customerEntity) {
      return this.login(credentials);
    }
  }
}
