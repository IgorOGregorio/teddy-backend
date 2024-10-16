import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { jwtConstants } from '../constants';
import { JwtStrategy } from '../jwt.strategy';
import { AuthPrismaRepository } from '../repositories/authPrisma.repository';
import { IAuthRepository } from '../repositories/iauth.repository';
import { AuthService } from '../services/auth.service';
import { PrismaService } from '../../prisma/Prisma.service';

export async function authModuleTest(): Promise<TestingModule> {
  return await Test.createTestingModule({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' },
      }),
    ],
    providers: [
      AuthService,
      JwtStrategy,
      {
        provide: IAuthRepository,
        useClass: AuthPrismaRepository,
      },
      PrismaService,
    ],
    exports: [
      AuthService,
      {
        provide: IAuthRepository,
        useClass: AuthPrismaRepository,
      },
      JwtStrategy,
    ],
    controllers: [AuthController],
  }).compile();
}
