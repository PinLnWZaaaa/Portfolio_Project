import {
  Controller,
  Get,
  Param,
  Req,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { Experience } from 'src/entities/experience.entity';
import { Skill } from 'src/entities/skill.entity';
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

  @Post('/experiences')
  async createExperience(@Body() data: Experience, @Req() req) {
    const userId = req.user.userId;
    const experienceId = await this.usersService.createExperience(data, userId);
    return {
      id: experienceId,
    };
  }

  @Post('/skills')
  async createSkill(@Body() data: Skill, @Req() req) {
    const userId = req.user.userId;
    const skillId = await this.usersService.createSkill(data, userId);
    return {
      id: skillId,
    };
  }

  @Delete('/experiences/:experienceId')
  async deleteExperience(@Param('experienceId') experienceId: number) {
    return await this.usersService.deleteExperience(experienceId);
  }
}
