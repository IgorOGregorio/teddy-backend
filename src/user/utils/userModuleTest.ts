import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/Prisma.service';
import { IUserRepository } from '../repositories/iuser.repository';
import { UserPrismaRepository } from '../repositories/userPrisma.repository';
import { CreateUserService } from '../services/createUser/createUser.service';
import { FindAllService } from '../services/findAll/findAll.service';
import { FindByIdService } from '../services/findById/findById.service';
import { UserController } from '../user.controller';

export async function userModuleTest(): Promise<TestingModule> {
  return await Test.createTestingModule({
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
  }).compile();
}
