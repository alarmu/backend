import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByPhone(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOneBy({ phone: phoneNumber });
  }

  async setAuthCode(phone: string, code: string): Promise<void> {
    let user = await this.findByPhone(phone);
    if (!user) {
      user = new User();
      user.phone = phone;
      user = await this.userRepository.save(user);
    }

    user.authCode = code;

    await this.userRepository.save(user);
  }

  async signIn(phone: string, code: string): Promise<{ access_token: string }> {
    const user = await this.findByPhone(phone);
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
