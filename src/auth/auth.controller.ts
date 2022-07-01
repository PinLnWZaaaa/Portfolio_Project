import {
  Controller,
  Request,
  Post,
  UseGuards,
  Response,
  HttpCode,
  Body,
  Get,
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
  async signupUser(@Body() data: any, @Response() res) {
    const user = await this.authService.signupUser(data);
    const token = await this.authService.login(user);
    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ message: 'Signup successfully' });
  }

  // ---------------------- Login User ----------------------
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const token = await this.authService.login(req.user);
    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ message: 'Login successfully' });
  }

  // ---------------------- Logout User ----------------------
  @Get('logout')
  async logout(@Response() res) {
    res
      .clearCookie('token', {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ message: 'Logout successfully' }); //after 7 days
  }
}
