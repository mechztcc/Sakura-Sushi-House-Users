import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from '../services/login/login.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Body() payload: LoginDto) {
    return this.loginService.execute(payload);
  }
}
