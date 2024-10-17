import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { CreateUrlService } from './services/createUrl/createUrl.service';
import { IUrlRepository } from './repositories/iUrl.repository';
import { UrlPrismaRepository } from './repositories/urlPrisma.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UrlController],
  providers: [
    CreateUrlService,
    {
      provide: IUrlRepository,
      useClass: UrlPrismaRepository,
    },
  ],
})
export class UrlModule {}
