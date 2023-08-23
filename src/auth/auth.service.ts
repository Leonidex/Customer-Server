import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const customer = await this.customerService.findOne({ where: { email } });

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
}
