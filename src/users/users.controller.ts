import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAllUsers() {
    return { data: await this.usersService.findAll() };
  }

  @Get('/profile')
  async getUserProfile(@Req() req: any) {
    const userId = req.user.userId;
    return { data: await this.usersService.getUserById(userId) };
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number) {
    return { data: await this.usersService.getUserById(userId) };
  }
}
