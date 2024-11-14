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
    private smsRuService: SmsRuService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const phoneNumber = parsePhoneNumber(signInDto.phone).format('E.164');

    if (!signInDto.code) {
      const code = await this.smsRuService.call(phoneNumber);

      await this.authService.setAuthCode(phoneNumber, code);

      return {
        success: true,
      };
    }

    return this.authService.signIn(phoneNumber, signInDto.code);
  }
}
