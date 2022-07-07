import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  secret: string;
  expires: string;
}

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
}));
