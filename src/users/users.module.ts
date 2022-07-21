import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Skill } from 'src/entities/skill.entity';
import { Workshop } from 'src/entities/workshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Skill, Workshop])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
