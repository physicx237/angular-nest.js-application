import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(phoneNumber: string, password: string) {
    const user = await this.usersService.findOneByPhoneNumber(phoneNumber);

    const hashPassword = user.password;

    const valid = await bcrypt.compare(password, hashPassword);

    if (valid !== true) {
      throw new UnauthorizedException('Неверный пароль!');
    }

    return user;
  }

  async login(signInDto: SignInDto) {
    const user = await this.usersService.findOneByPhoneNumber(
      signInDto.phoneNumber,
    );

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      phoneNumber: user.phoneNumber,
      password: signInDto.password,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }
}
