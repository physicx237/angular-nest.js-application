import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/auth/schemas/user.schema';
import { Role } from 'src/auth/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    const user = new User();

    const password = await bcrypt.hash(userDto.password, 10);

    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.patronymic = userDto.patronymic;
    user.phoneNumber = userDto.phoneNumber;
    user.password = password;
    user.role = Role.User;

    const createdUser = await this.usersRepository.save(user);

    createdUser.password = userDto.password;

    return createdUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      phoneNumber: phoneNumber,
    });

    return user;
  }

  async update(userDto: UserDto, access_token: string): Promise<UpdateResult> {
    const token = access_token.replace('Bearer ', '');

    const user = await this.jwtService.verifyAsync(token);

    const password = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.update(
      { id: user.id },
      {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        patronymic: userDto.patronymic,
        phoneNumber: userDto.phoneNumber,
        password: password,
      },
    );
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
