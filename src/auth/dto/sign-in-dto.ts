import {
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  Length,
} from '@nestjs/class-validator';
export class SignInDto {
  @IsPhoneNumber('RU', {
    message: 'Invalid phone number',
  })
  phone: string;

  @IsOptional()
  @Length(4, 4, {
    message: 'Invalid code length',
  })
  @IsNumberString()
  code: string;
}
