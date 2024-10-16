import { FindByEmailService } from './findByEmail.service';
import { User } from '../../entities/user.entity';
import { userModuleTest } from '../../utils/userModuleTest';

describe('FindByEmailService', () => {
  let findByEmailService: FindByEmailService;

  beforeEach(async () => {
    const module = await userModuleTest();
    findByEmailService = module.get(FindByEmailService);
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
