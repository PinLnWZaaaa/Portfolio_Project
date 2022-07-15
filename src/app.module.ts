import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

const connectionOptions = PostgressConnectionStringParser.parse(
  process.env.DATABASE_URL,
);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionOptions.host,
      port: Number(connectionOptions.port) || 5432,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      entities: [join(__dirname, '**/*.entity.{ts,js}')],
      synchronize: true, // auto migration when schema is changed
      ssl: process.env.ENABLE_SSL === 'true',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
