import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAllUsers() {
    return { data: await this.usersService.findAll() };
  }

  @Get('/:userId')
  getUserById(@Param('userId') id: number) {
    return this.usersService.getUserById(id);
  }
}
