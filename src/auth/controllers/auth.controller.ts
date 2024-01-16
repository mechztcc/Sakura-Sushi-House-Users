import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from '../services/login/login.service';
import { DecodeJwtService } from '../services/decode-jwt/decode-jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly decodeJwtService: DecodeJwtService,
  ) {}
  @Post()
  async login(@Body() payload: LoginDto) {
    return this.loginService.execute(payload);
  }

  @Post('decode')
  async decodeJwt(@Body() payload: { token: string }) {
    return this.decodeJwtService.execute(payload.token);
  }
}
