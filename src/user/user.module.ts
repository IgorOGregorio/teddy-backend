import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/createUser/createUser.service';
import { IUserRepository } from './repositories/iuser.repository';
import { UserPrismaRepository } from './repositories/userPrisma.repository';
import { FindByIdService } from './services/findById/findById.service';
import { FindAllService } from './services/findAll/findAll.service';
import { PrismaService } from '../prisma/Prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    FindByIdService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    FindAllService,
    PrismaService,
  ],
  exports: [FindByIdService],
})
export class UserModule {}
