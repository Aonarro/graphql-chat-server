import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe, Logger as NestjsLogger } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  const configService = app.get(ConfigService);
  await app.listen(configService.get('SERVER_PORT'), () => {
    NestjsLogger.log('Server started at: ', configService.get('SERVER_PORT'));
  });
}
bootstrap();
