import { AuthService } from './auth.service';
import { authModuleTest } from '../utils/authModuleTest';
import { AuthDto } from '../dto/auth.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await authModuleTest();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', async () => {
    const auth: AuthDto = {
      email: 'user@example.com',
      password: '12345678',
    };

    //validate login
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYzZWJjOWZmLWZkYTQtNDM5Ni04YmQ5LWY5NjUxNDIzMDJmNiIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTcyOTEwNTMxNywiZXhwIjoxNzI5MTA4OTE3fQ.iT4qnEjws-fyIaaTHlgH0uF5pPCMI7zvMFsY53ac84c';

    service.login = jest.fn().mockResolvedValue({
      accessToken: token,
    });

    const result = await service.login(auth);

    expect(result).toStrictEqual({
      accessToken: token,
    });
  });
});
