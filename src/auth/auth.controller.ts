import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Ip,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-dto';
import { parsePhoneNumber } from 'libphonenumber-js';
import { SmsRuService } from '../smsru/smsRu.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private smsRuService: SmsRuService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Ip() ip: string) {
    const phoneNumber = parsePhoneNumber(signInDto.phone).format('E.164');

    if (!signInDto.code) {
      await this.smsRuService.call(phoneNumber, ip);
      return {
        success: true,
      };
    }

    return this.authService.signIn(phoneNumber, signInDto.code);
  }
}
