import { Module } from '@nestjs/common';
import { AlarmsModule } from './alarms/alarms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import typeorm from './common/config/typeorm';
import sms_ru from './common/config/sms_ru';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsRuModule } from './smsru/smsru.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AlarmsModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [typeorm, sms_ru],
    }),
    ScheduleModule.forRoot(),
    SmsRuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
