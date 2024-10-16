import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { userModuleTest } from '../../utils/userModuleTest';
import { CreateUserService } from './createUser.service';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module = await userModuleTest();
    createUserService = module.get(CreateUserService);
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
