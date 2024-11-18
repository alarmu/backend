import { Module } from '@nestjs/common';
import { AlarmsModule } from './alarms/alarms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import app from './common/config/app';
import typeorm from './common/config/typeorm';
import sms_ru from './common/config/sms_ru';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsRuModule } from './smsru/smsru.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [app, typeorm, sms_ru],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    AlarmsModule,
    AuthModule,
    ScheduleModule.forRoot(),
    SmsRuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
