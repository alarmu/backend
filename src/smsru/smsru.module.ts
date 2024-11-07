import { HttpModule } from '@nestjs/axios';
import { SmsRuService } from './smsRu.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SmsRuService, ConfigService],
})
export class SmsRuModule {}
