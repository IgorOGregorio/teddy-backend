import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/Prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/services/auth.service';
import { UrlModule } from './url/url.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, JwtModule, UrlModule],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
