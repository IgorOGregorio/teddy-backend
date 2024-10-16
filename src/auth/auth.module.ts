import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { IAuthRepository } from './repositories/iauth.repository';
import { AuthPrismaRepository } from './repositories/authPrisma.repository';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';

@Module({
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
})
export class AuthModule {}
