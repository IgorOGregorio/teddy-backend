import { JwtModule } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/Prisma.service';
import { UserModule } from '../../user/user.module';
import { IUrlRepository } from '../repositories/iUrl.repository';
import { UrlPrismaRepository } from '../repositories/urlPrisma.repository';
import { CreateUrlService } from '../services/createUrl/createUrl.service';
import { DeleteUrlService } from '../services/deleteUrl/deleteUrl.service';
import { FindUrlsByUserIdService } from '../services/findUrlsByUserId/findUrlsByUserId.service';
import { RedirectUrlService } from '../services/redirectUrl/redirectUrl.service';
import { UpdateUrlService } from '../services/updateUrl/updateUrl.service';
import { UrlController } from '../url.controller';

export async function urlModuleTest(): Promise<TestingModule> {
  return await Test.createTestingModule({
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
      PrismaService,
    ],
    exports: [
      FindUrlsByUserIdService,
      RedirectUrlService,
      {
        provide: IUrlRepository,
        useClass: UrlPrismaRepository,
      },
    ],
  }).compile();
}
