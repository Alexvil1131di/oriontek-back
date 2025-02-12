import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth-guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });


  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipUndefinedProperties: false,
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('OrionTechApi')
    .setDescription('a simple clients api for oriontek')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);


  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
