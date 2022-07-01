import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRespository: Repository<User>,
  ) {}
  
    
  async findUserByUsername(username: string): Promise<User | undefined> {
       return await this.usersRespository.findOneBy({ username: username})
      
    }



  }
