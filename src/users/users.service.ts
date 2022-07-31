import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Skill } from 'src/entities/skill.entity';
import { Workshop } from 'src/entities/workshop.entity';
import { Experience } from 'src/entities/experience.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
    @InjectRepository(Workshop) private workshopRepo: Repository<Workshop>,
    @InjectRepository(Experience)
    private experienceRepo: Repository<Experience>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find({
      select: ['id', 'nickname', 'position', 'email'],
    });
  }

  async getUserById(id: number): Promise<any> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id,
        },
        relations: ['skills', 'workshops', 'experiences'],
      });

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      const { password, ...result } = user;
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findUserByUsername(username: string) {
    return await this.userRepo.findOneBy({ username: username });
  }

  async createUser(data: Omit<User, 'id'>) {
    try {
      const user = await this.userRepo.findOneBy({
        username: data.username,
      });

      if (user) {
        throw new BadRequestException('User already existed');
      }

      const salt = await bcrypt.genSalt(12);
      data.password = await bcrypt.hash(data.password, salt);
      const newUser = { ...new User(), ...data };
      await this.userRepo.save(newUser);
      return newUser;
    } catch (err) {
      console.log(`Cannot signup user. error=${err}`);
      throw err;
    }
  }

  async deleteSkill(skillId: number) {
    try {
      const result = await this.skillRepo.delete(skillId);

      if (result.affected === 0) {
        throw new BadRequestException('Skill not found');
      }

      return {
        message: "User's skill was deleted",
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteWorkshop(workshopId: number) {
    try {
      const result = await this.workshopRepo.delete(workshopId);

      if (result.affected === 0) {
        throw new BadRequestException('Workshop not found');
      }

      return {
        message: "User's workshop was deleted",
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createExperience(data: Experience, userId) {
    try {
      const { name, description, role, position } = data;
      const newExp = this.experienceRepo.create({
        name,
        description,
        role,
        position,
      });

      const userLink = await this.userRepo.findOneBy({
        id: userId,
      });
      newExp.user = userLink;
      await this.experienceRepo.save(newExp);

      return newExp.id;
    } catch (err) {
      console.log(`Cannot crate experience. error=${err}`);
      throw err;
    }
  }

  async createSkill(data: Skill, userId) {
    try {
      const { name, level } = data;
      const newSkill = this.skillRepo.create({
        name,
        level,
      });

      const userLink = await this.userRepo.findOneBy({
        id: userId,
      });
      newSkill.user = userLink;
      await this.skillRepo.save(newSkill);

      return newSkill.id;
    } catch (err) {
      console.log(`Cannot crate skill. error=${err}`);
      throw err;
    }
  }

  async deleteExperience(experienceId: number) {
    try {
      const result = await this.experienceRepo.delete(experienceId);

      if (result.affected === 0) {
        throw new BadRequestException('Experience not found');
      }

      return {
        message: "User's experience was deleted",
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createWorkshop(data: Workshop, userId) {
    try {
      const { name, description } = data;
      const newWorkshop = this.workshopRepo.create({
        name,
        description,
      });

      const userLink = await this.userRepo.findOneBy({
        id: userId,
      });
      newWorkshop.user = userLink;
      await this.workshopRepo.save(newWorkshop);

      return newWorkshop.id;
    } catch (err) {
      console.log(`Cannot crate workshop. error=${err}`);
      throw err;
    }
  }

  deleteProperty(data: any, propertyName: string) {
    if (data.hasOwnProperty(propertyName)) {
      delete data[propertyName];
    }
  }
  async updateWorkshop(
    workshopId: number,
    data: Partial<Omit<Workshop, 'id'>>,
  ) {
    try {
      this.deleteProperty(data, 'id');
      const workshop = {
        ...(await this.workshopRepo.findOne({ where: { id: workshopId } })),
        ...data,
      };
      await this.workshopRepo.save(workshop);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Cannot update workshop');
    }
  }
}
