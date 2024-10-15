import { Test, TestingModule } from '@nestjs/testing';
import { FindAllService } from './findAll.service';
import { PrismaService } from '../../../prisma/Prisma.service';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserPrismaRepository } from '../../repositories/userPrisma.repository';
import { UserController } from '../../user.controller';
import { CreateUserService } from '../createUser/createUser.service';
import { FindByEmailService } from '../findByEmail/findByEmail.service';
import { User } from '../../entities/user.entity';

describe('FindAllService', () => {
  let service: FindAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserService,
        FindByEmailService,
        FindAllService,
        {
          provide: IUserRepository,
          useClass: UserPrismaRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<FindAllService>(FindAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const result: User[] = [
      new User({
        name: 'test',
        email: 'test@email.com',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new User({
        name: 'test 2',
        email: 'test 2@email.com',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    jest.spyOn(service, 'execute').mockImplementation(async () => result);

    expect(await service.execute()).toStrictEqual(result);
  });
});
