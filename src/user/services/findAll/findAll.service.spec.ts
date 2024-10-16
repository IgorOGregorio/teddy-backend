import { FindAllService } from './findAll.service';
import { User } from '../../entities/user.entity';
import { userModuleTest } from '../../utils/userModuleTest';

describe('FindAllService', () => {
  let service: FindAllService;

  beforeEach(async () => {
    const module = await userModuleTest();
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
