import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import cors from '@fastify/cors';

dotenv.config();

async function createApp() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // expressApp ? new ExpressAdapter(expressApp) : undefined,
    { bufferLogs: true },
  );

  console.log('NestFactory created');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));
  app.useGlobalInterceptors(
    // new LoggerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  console.log('App configuration complete');

  return app;
}

async function setupSwagger(app: any) {
  const config = new DocumentBuilder()
    .setTitle('Jirox API')
    .setDescription('Jira Clone API')
    .setVersion('1.0')
    // .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // generate swagger.json incase of dev
  if (process.env.NODE_ENV !== 'production') {
    writeFileSync(
      'api-schemas/api-swagger-spec.json',
      JSON.stringify(document),
    );
  }

  console.log('Swagger setup complete');
}

async function bootstrap() {
  try {
    console.log('Starting development server');
    const app = await createApp();
    await setupSwagger(app);
    const configService = app.get(ConfigService);
    const port = configService.getOrThrow('app.port') ?? 4000;
    await app.listen(port);
    console.log(`Development server running on port ${port}`);
  } catch (error) {
    console.error('Development server bootstrap error:', error);
    process.exit(1);
  }
}

bootstrap();
