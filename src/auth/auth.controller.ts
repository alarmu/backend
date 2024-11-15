import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Ip, Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-dto';
import { parsePhoneNumber } from 'libphonenumber-js';
import { SmsRuService } from '../smsru/smsRu.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(SmsRuService.name);
  constructor(
    private smsRuService: SmsRuService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const phoneNumber = parsePhoneNumber(signInDto.phone).format('E.164');

    if (!signInDto.code) {
      return await this.smsRuService
        .call(phoneNumber)
        .then(async (code) => {
          await this.authService.setAuthCode(phoneNumber, code);

          return {
            success: true,
          };
        })
        .catch((err) => {
          this.logger.log('SignIn failed: ', err);
          return {
            success: false,
          };
        });
    }

    return this.authService.signIn(phoneNumber, signInDto.code);
  }
}
