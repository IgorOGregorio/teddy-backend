import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';
import { authModuleTest } from './utils/authModuleTest';
import { jwtConstants } from './constants';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await authModuleTest();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    const auth: AuthDto = {
      email: 'user@email.com',
      password: '12345678',
    };

    const payload = {
      id: crypto.randomUUID(),
      email: auth.email,
    };

    const result = {
      accessToken: await jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '3600s',
      }), //
    };

    jest.spyOn(service, 'login').mockImplementation(async () => result);

    expect(await controller.login(auth)).toStrictEqual(result);
  });
});
