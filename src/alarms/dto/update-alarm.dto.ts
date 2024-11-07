import { PartialType } from '@nestjs/mapped-types';
import { CreateAlarmDto } from './create-alarm.dto';

export class UpdateAlarmDto extends PartialType(CreateAlarmDto) {
  time: string;
  name: string;
  active: boolean;
}
