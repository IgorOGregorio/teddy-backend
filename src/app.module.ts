import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/Prisma.module';
import { UserModule } from './user/user.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
