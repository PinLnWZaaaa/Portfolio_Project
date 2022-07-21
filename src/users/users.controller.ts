import { Controller, Get, Param, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get('/profile')
  async getUserProfile(@Req() req: any) {
    const userId = req.user.userId;
    return await this.usersService.getUserById(userId);
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number) {
    return await this.usersService.getUserById(userId);
  }

  @Delete('/skills/:skillId')
  async deleteSkill(@Param('skillId') skillId: number) {
    return await this.usersService.deleteSkill(skillId);
  }

  @Delete('/workshops/:workshopId')
  async deleteWorkshop(@Param('workshopId') workshopId: number) {
    return await this.usersService.deleteWorkshop(workshopId);
  }
}
