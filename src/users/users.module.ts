import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ValidUserMiddleware } from 'src/common/middleware/validUser.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {configure(consumer: MiddlewareConsumer) {
  consumer.apply(ValidUserMiddleware).forRoutes({
    path: 'users/:userId',
    method: RequestMethod.GET
  });
}}
