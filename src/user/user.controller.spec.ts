import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/Prisma.service';
import { IUserRepository } from './repositories/iuser.repository';
import { UserPrismaRepository } from './repositories/userPrisma.repository';
import { CreateUserService } from './services/createUser/createUser.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindByEmailService } from './services/findByEmail/findByEmail.service';

describe('UserController', () => {
  let userController: UserController;
  let createUserService: CreateUserService;
  let findByEmailService: FindByEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    userController = module.get(UserController);
    createUserService = module.get(CreateUserService);
    findByEmailService = module.get(FindByEmailService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
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

    expect(await userController.create(createUserDto)).toStrictEqual(
      result.toJson(),
    );
  });

  it('should find an user by email', async () => {
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

    expect(await userController.findByEmail(result.email)).toStrictEqual(
      result.toJson(),
    );
  });
});
