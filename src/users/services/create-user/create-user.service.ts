import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ email, phone, name, password, role }: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    const phoneExists = await this.prisma.user.findUnique({ where: { phone } });

    if (userExists || phoneExists) {
      throw new ConflictException('Provided email / phone already in use');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: { email, phone, name, role, password: hashedPass },
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  }
}
