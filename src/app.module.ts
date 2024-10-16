import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/Prisma.module';
import { UserModule } from './user/user.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/services/auth.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, JwtModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
