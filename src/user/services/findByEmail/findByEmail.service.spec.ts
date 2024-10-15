import { Test } from '@nestjs/testing';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserPrismaRepository } from '../../repositories/userPrisma.repository';
import { UserController } from '../../user.controller';
import { CreateUserService } from '../createUser/createUser.service';
import { FindByEmailService } from './findByEmail.service';
import { User } from '../../entities/user.entity';
import { PrismaService } from '../../../prisma/Prisma.service';

describe('FindByEmailService', () => {
  let findByEmailService: FindByEmailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserService,
        FindByEmailService,
        {
          provide: IUserRepository,
          useClass: UserPrismaRepository,
        },
        PrismaService,
      ],
    }).compile();

    findByEmailService = moduleRef.get(FindByEmailService);
  });

  it('should be defined', () => {
    expect(findByEmailService).toBeDefined();
  });

  it('find an user by email', async () => {
    const result = new User({
      name: 'test',
      email: 'test@email.com',
      password: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest
      .spyOn(findByEmailService, 'execute')
      .mockImplementation(async () => result);

    expect(await findByEmailService.execute(result.email)).toBe(result);
  });
});
