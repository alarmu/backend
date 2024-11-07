import { registerAs } from '@nestjs/config';

export default registerAs('sms_ru', () => ({
  api_id: process.env.SMS_RU_API_ID,
}));
