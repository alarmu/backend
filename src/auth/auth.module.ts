import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsRuService } from '../smsru/smsRu.service';
import { SmsRuModule } from '../smsru/smsru.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwt_secret'),
      }),
      inject: [ConfigService],
    }),
    SmsRuModule,
  ],
  providers: [AuthService, SmsRuService],
  controllers: [AuthController],
})
export class AuthModule {}
