import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

const SMS_RU_STATUS_OK = 'OK';

@Injectable()
export class SmsRuService {
  private readonly logger = new Logger(SmsRuService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async call(phone: string, ip: string = '-1'): Promise<string> {
    return this.httpService.axiosRef
      .get('https://sms.ru/code/call', {
        params: {
          phone,
          ip,
          api_id: this.configService.get('sms_ru.api_id'),
        },
      })
      .then((res) => res.data.json())
      .then((res) => {
        if (res['status'] !== SMS_RU_STATUS_OK) {
          throw res['status_text'];
        }
        return res['code'];
      })
      .catch((err) => {
        this.logger.log(err.message);
      });
  }
}
