import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private alarmsRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(id: string): Promise<User | null> {
    return this.alarmsRepository.findOneBy({ id });
  }

  findByPhone(phoneNumber: string): Promise<User | null> {
    return this.alarmsRepository.findOneBy({ phone: phoneNumber });
  }
}
