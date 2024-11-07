import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  jwt_secret: process.env.JWT_SECRET,
}));
