import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
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

  app.enableCors();

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  setupSwagger(app);

  await prismaService.enableShutdownHooks(app);

  await app.listen(port);
}
bootstrap();
