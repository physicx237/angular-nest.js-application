import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(req.user.phoneNumber);

    res.cookie('refresh_token', tokens.refresh_token);

    return {
      access_token: tokens.access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
