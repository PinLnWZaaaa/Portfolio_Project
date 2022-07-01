import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Cookie Parser
  app.use(cookieParser(process.env.COOKIES_SECRET));

  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
