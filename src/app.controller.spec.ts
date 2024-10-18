import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { AuthService } from './auth/services/auth.service';
import { PrismaModule } from './prisma/Prisma.module';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UserModule, AuthModule, JwtModule, UrlModule],
      providers: [
        AuthService,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
