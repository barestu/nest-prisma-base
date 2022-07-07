import { registerAs } from '@nestjs/config';

export interface AppConfig {
  name: string;
  port: number;
}

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: Number(process.env.APP_PORT) || 5000,
}));
