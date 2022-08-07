import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Skill } from 'src/entities/skill.entity';
import { Workshop } from 'src/entities/workshop.entity';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { getAllUserParam } from 'src/types/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
    @InjectRepository(Workshop) private workshopRepo: Repository<Workshop>,
  ) {}

  /*async findAll(): Promise<User[]> {
    return await this.userRepo.find({
      select: ['username', 'nickname', 'position', 'email'],
    });
  }*/
  async findMany(param: getAllUserParam): Promise<User[]> {
    return await this.userRepo.find({
      select: ['id', 'nickname', 'position', 'email'],
      where: [param],
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
}
