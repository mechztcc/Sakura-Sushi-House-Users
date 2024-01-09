import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
