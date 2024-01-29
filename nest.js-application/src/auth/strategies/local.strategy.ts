import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  Password,
  PhoneNumber,
  passwordSchema,
  phoneNumberSchema,
} from '../schemas/sign-in.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phoneNumber', passwordField: 'password' });
  }

  async validate(phoneNumber: PhoneNumber, password: Password): Promise<any> {
    try {
      phoneNumberSchema.parse(phoneNumber);
      passwordSchema.parse(password);
    } catch (error) {
      throw new BadRequestException('Ошибка валидации!');
    }

    const user = await this.authService.validate(phoneNumber, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
