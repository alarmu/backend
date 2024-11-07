import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(phone: string, code: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByPhone(phone);
    if (user?.authCode !== code) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
