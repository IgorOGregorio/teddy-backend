import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { CreateUrlService } from './services/createUrl/createUrl.service';
import { IUrlRepository } from './repositories/iUrl.repository';
import { UrlPrismaRepository } from './repositories/urlPrisma.repository';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { FindUrlsByUserIdService } from './services/findUrlsByUserId/findUrlsByUserId.service';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [UrlController],
  providers: [
    CreateUrlService,
    FindUrlsByUserIdService,
    {
      provide: IUrlRepository,
      useClass: UrlPrismaRepository,
    },
  ],
  exports: [
    FindUrlsByUserIdService,
    {
      provide: IUrlRepository,
      useClass: UrlPrismaRepository,
    },
  ],
})
export class UrlModule {}
