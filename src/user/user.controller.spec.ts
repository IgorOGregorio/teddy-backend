import { UserController } from './user.controller';
import { CreateUserService } from './services/createUser/createUser.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindByEmailService } from './services/findById/findById.service';
import { userModuleTest } from './utils/userModuleTest';

describe('UserController', () => {
  let userController: UserController;
  let createUserService: CreateUserService;
  let findByEmailService: FindByEmailService;

  beforeEach(async () => {
    const module = await userModuleTest();

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
