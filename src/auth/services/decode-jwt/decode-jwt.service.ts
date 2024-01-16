import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';

@Injectable()
export class DecodeJwtService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  execute(token: string) {
    const decoded = this.jwtService.decode(token);
    if (!token || !decoded) {
      throw new UnauthorizedException('Token has not provided');
    }

    return decoded;
  }
}
