import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { CreateUrlService } from './services/createUrl/createUrl.service';
import { IUrlRepository } from './repositories/iUrl.repository';
import { UrlPrismaRepository } from './repositories/urlPrisma.repository';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { FindUrlsByUserIdService } from './services/findUrlsByUserId/findUrlsByUserId.service';
import { UpdateUrlService } from './services/updateUrl/updateUrl.service';
import { DeleteUrlService } from './services/deleteUrl/deleteUrl.service';
import { RedirectUrlService } from './services/redirectUrl/redirectUrl.service';

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
    UpdateUrlService,
    DeleteUrlService,
    RedirectUrlService,
  ],
  exports: [
    FindUrlsByUserIdService,
    RedirectUrlService,
    {
      provide: IUrlRepository,
      useClass: UrlPrismaRepository,
    },
  ],
})
export class UrlModule {}
