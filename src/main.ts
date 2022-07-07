import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configservice = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const port = configservice.get<AppConfig>('app').port;

  await prismaService.enableShutdownHooks(app);
  setupSwagger(app);
  await app.listen(port);
}
bootstrap();
