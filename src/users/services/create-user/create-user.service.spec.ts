import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { CreateUserService } from './create-user.service';
import { ConflictException } from '@nestjs/common';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let prismaServiceMock: PrismaService;

  beforeAll(async () => {
    const prismaMock = {
      user: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new User', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      phone: '123456789',
      name: 'Test User',
      password: 'password123',
      role: 'CUSTOMER',
    };

    const mockedUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'CUSTOMER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prismaServiceMock.user.findFirst as jest.Mock).mockResolvedValue(null);
    (prismaServiceMock.user.create as jest.Mock).mockResolvedValue(mockedUser);

    const createdUser = await service.execute(userData);
    expect(createdUser.id).toBeDefined();
  });

  it('should throw ConflictException if user already exists', async () => {
    (prismaServiceMock.user.findFirst as jest.Mock).mockResolvedValue({});

    const userData: CreateUserDto = {
      email: 'test@example.com',
      phone: '123456789',
      name: 'Test User',
      password: 'password123',
      role: 'CUSTOMER',
    };

    await expect(service.execute(userData)).rejects.toThrow(ConflictException);
  });
});
