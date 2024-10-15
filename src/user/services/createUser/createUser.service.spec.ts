import { Test } from '@nestjs/testing';
import { UserController } from '../../user.controller';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserPrismaRepository } from '../../repositories/userPrisma.repository';
import { PrismaService } from '../../../prisma/Prisma.service';
import { CreateUserService } from './createUser.service';
import { FindByEmailService } from '../findByEmail/findByEmail.service';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;

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

    createUserService = moduleRef.get(CreateUserService);
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
  });

  it('should create an user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'test',
      email: 'test@email.com',
      password: 'test',
    };

    const result = new User({
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    jest
      .spyOn(createUserService, 'execute')
      .mockImplementation(async () => result);

    expect(await createUserService.execute(createUserDto)).toBe(result);
  });
});
