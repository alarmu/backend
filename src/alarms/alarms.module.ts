import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './alarms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from './entities/alarm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm])],
  exports: [TypeOrmModule],
  controllers: [AlarmsController],
  providers: [AlarmsService],
})
export class AlarmsModule {}
