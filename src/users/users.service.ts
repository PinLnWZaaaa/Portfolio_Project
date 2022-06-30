import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';





@Injectable()
export class UsersService {
    users: any;
    
    async findUserByUsername(username: string): Promise<User | undefined> {
      return this.users.find(User => User.username === username);
    }
  }
