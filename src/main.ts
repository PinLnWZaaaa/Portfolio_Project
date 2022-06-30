import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.COOKIES_SECRET));
  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
