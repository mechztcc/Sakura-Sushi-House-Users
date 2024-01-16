import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';

@Controller('users')
export class UsersController {
  constructor(private createUsersService: CreateUserService) {}


  @Post()
  async create(@Body() payload: CreateUserDto) {
    return this.createUsersService.execute(payload);
  }
}
