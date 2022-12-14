import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRespository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRespository.find({
      select: ['id', 'nickname', 'position', 'email'],
    });
  }

  async getUserById(id: number): Promise<any> {
    try {
      const user = await this.usersRespository.findOne({
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
    return await this.usersRespository.findOneBy({ username: username });
  }

  async createUser(data: Omit<User, 'id'>) {
    try {
      const user = await this.usersRespository.findOneBy({
        username: data.username,
      });

      if (user) {
        throw new BadRequestException('User already existed');
      }

      const salt = await bcrypt.genSalt(12);
      data.password = await bcrypt.hash(data.password, salt);
      const newUser = { ...new User(), ...data };
      await this.usersRespository.save(newUser);
      return newUser;
    } catch (err) {
      console.log(`Cannot signup user. error=${err}`);
      throw err;
    }
  }
}
