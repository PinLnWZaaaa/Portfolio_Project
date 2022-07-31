import {
  Controller,
  Get,
  Param,
  Req,
  Delete,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { Experience } from 'src/entities/experience.entity';
import { Skill } from 'src/entities/skill.entity';
import { User } from 'src/entities/user.entity';
import { Workshop } from 'src/entities/workshop.entity';
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

  @Post('/workshops')
  async createWorkshop(@Body() data: Workshop, @Req() req) {
    const userId = req.user.userId;
    const workshopId = await this.usersService.createWorkshop(data, userId);
    return {
      id: workshopId,
    };
  }
  @Patch('/workshops/:workshopId')
  async updateWorkshop(
    @Param('workshopId') workshopId: number,
    @Body() data: Partial<Omit<Workshop, 'id'>>,
  ) {
    await this.usersService.updateWorkshop(workshopId, data);
    return { message: "User's workshop info was updated" };
  }

  @Patch('/experiences/:experienceId')
  async updateExperience(
    @Param('experienceId') experienceId: number,
    @Body() data: Partial<Omit<Experience, 'id'>>,
  ) {
    await this.usersService.updateExperience(experienceId, data);
    return { message: "User's experience info was updated" };
  }

  @Patch()
  async updateUserInfo(
    @Req() req,
    @Body() data: Partial<Omit<User, 'id' | 'password' | 'username'>>,
  ) {
    const userId = req.user.userId;
    await this.usersService.updateUserInfo(userId, data);
    return { message: 'User info was updated' };
  }

  @Patch('/skills/:skillId')
  async updateSkill(
    @Param('skillId') skillId: number,
    @Body() data: Partial<Omit<Skill, 'id'>>,
  ) {
    await this.usersService.updateSkill(skillId, data);
    return { message: "User's skill info was updated" };
  }
}
