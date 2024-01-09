import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { LoginService } from './services/login/login.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [LoginService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
  ],
})
export class AuthModule {}
