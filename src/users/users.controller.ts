import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService : UsersService) {}



  @Get()
  async getUser(@Query('username') username: string) {
    console.log(username)
    const user = await this.userService.findUserByUsername(username);
    console.log(user)
    return user;

  }
  
 
  
}
