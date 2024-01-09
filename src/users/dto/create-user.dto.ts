import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
