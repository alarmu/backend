import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SmsRuService } from '../smsru/smsRu.service';
import { AlarmsService } from '../alarms/alarms.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private smsRuService: SmsRuService,
    private readonly alarmsService: AlarmsService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    this.alarmsService.findAllForTime(time).then((alarms) => {
      this.logger.debug('Alarms for ' + time);
      for (const alarm of alarms) {
        this.smsRuService.call(alarm.user.phone).then(() => {
          this.logger.debug('Success call for ' + alarm.user.phone);
        });
      }
    });
  }
}
