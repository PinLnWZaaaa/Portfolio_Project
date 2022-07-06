import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';
import { FindUserResponseDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getAllUsers() {
    return { data: await this.userService.findAll() };
  }

  @Get('/:userId')
  getUserById(@Param('userId') userId: string): FindUserResponseDto {
    return this.userService.getUserById(userId);
  }
}
