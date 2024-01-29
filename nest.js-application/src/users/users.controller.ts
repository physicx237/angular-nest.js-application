import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Headers,
  Put,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from 'src/auth/pipes/validation.pipe';
import { UserDto, userSchema } from 'src/auth/schemas/user.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(userSchema))
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Roles(Role.Admin)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<User | null> {
    return this.usersService.findOneById(id);
  }

  @Put()
  update(
    @Body() userDto: UserDto,
    @Headers('Authorization') access_token: string,
  ) {
    return this.usersService.update(userDto, access_token);
  }

  @Delete(':id')
  async remove(@Param() id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
