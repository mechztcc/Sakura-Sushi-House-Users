import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('LoginService', () => {
  let service: LoginService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const prismaServiceMock = {
      user: {
        findUnique: jest.fn(),
      },
    };

    const jwtServiceMock = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw UnauthorizedException for incorrect email/password combination', async () => {
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

    const loginData = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    await expect(service.execute(loginData)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException for incorrect password', async () => {
    const existingUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword123',
      name: 'Test User',
    };

    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

    const loginData = {
      email: 'test@example.com',
      password: 'incorrectPassword',
    };

    await expect(service.execute(loginData)).rejects.toThrow(UnauthorizedException);
  });
});
