import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: LoginDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (!userExists) {
      throw new UnauthorizedException('Incorrect email/password combination.');
    }

    const passwordConfirmed = await compare(password, userExists.password);
    if (!passwordConfirmed) {
      throw new UnauthorizedException('Incorrect email/password combination.');
    }

    const payload = { id: userExists.id, email: userExists.email };

    return {
      user: {
        name: userExists.name,
        email: userExists.email,
        token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
