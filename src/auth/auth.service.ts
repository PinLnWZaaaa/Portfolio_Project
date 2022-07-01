import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatchedPassword = await bcrypt.compare(pass, user.password);
    if (isMatchedPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signupUser(data: any) {
    return await this.usersService.createUser(data);
  }
}
