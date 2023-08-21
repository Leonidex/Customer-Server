import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.customerService.findOne({ where: { email } });

    if (!(await bcrypt.compare(password, user?.hashedPassword))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
