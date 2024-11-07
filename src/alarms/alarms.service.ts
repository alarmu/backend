import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from './entities/alarm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectRepository(Alarm) private alarmsRepository: Repository<Alarm>,
  ) {}
  create(userId: string, createAlarmDto: CreateAlarmDto) {
    return this.alarmsRepository.create(createAlarmDto);
  }

  findAll(userId: string): Promise<Alarm[]> {
    return this.alarmsRepository.findBy({ userId: userId });
  }

  findOne(userId: string, id: string): Promise<Alarm | null> {
    return this.alarmsRepository.findOneBy({ id, userId });
  }

  update(userId: string, id: string, updateAlarmDto: UpdateAlarmDto) {
    return this.alarmsRepository.update({ id, userId }, updateAlarmDto);
  }

  async remove(userId: string, id: string) {
    await this.alarmsRepository.delete({ id, userId });
  }
}
