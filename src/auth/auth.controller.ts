import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpCode,
  Body,
  Response,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---------------------- Signup User ----------------------
  @Public()
  @HttpCode(201)
  @Post('signup')
  async signupUser(@Body() data: any) {
    const message = await this.authService.signupUser(data);
    return { message: message };
  }

  // ---------------------- Login User ----------------------
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const token = this.authService.login(req.user);
    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ message: 'Login successfully' });
  }
}
