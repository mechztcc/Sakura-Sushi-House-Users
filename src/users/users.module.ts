import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user/create-user.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService],
  imports: [PrismaModule],
})
export class UsersModule {}
