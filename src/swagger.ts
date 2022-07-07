import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './config/app.config';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  const documentConfig = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription('REST API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      persistAuthorization: true,
    },
  });
}
