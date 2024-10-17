import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/createUser/createUser.service';
import { IUserRepository } from './repositories/iuser.repository';
import { UserPrismaRepository } from './repositories/userPrisma.repository';
import { FindByEmailService } from './services/findByEmail/findByEmail.service';
import { FindAllService } from './services/findAll/findAll.service';
import { PrismaService } from '../prisma/Prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    FindByEmailService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    FindAllService,
    PrismaService,
  ],
  exports: [FindByEmailService],
})
export class UserModule {}
