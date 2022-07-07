import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  // enable shutdown hook
  await prismaService.enableShutdownHooks(app);

  setupSwagger(app);

  await app.listen(configService.get('app.port'));
}
bootstrap();
