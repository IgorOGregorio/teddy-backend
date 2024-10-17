import { Test, TestingModule } from '@nestjs/testing';
import { CreateUrlService } from './createUrl.service';
import { IUrlRepository } from '../../repositories/iUrl.repository';
import { UrlPrismaRepository } from '../../repositories/urlPrisma.repository';
import { UrlController } from '../../url.controller';
import { PrismaService } from '../../../prisma/Prisma.service';
import { UserModule } from '../../../user/user.module';

describe('CreateUrlService', () => {
  let service: CreateUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [UrlController],
      providers: [
        CreateUrlService,
        {
          provide: IUrlRepository,
          useClass: UrlPrismaRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<CreateUrlService>(CreateUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a url', async () => {
    const url = await service.execute(
      { url: 'https://www.google.com' },
      'user@example.com',
    );

    expect(url.id).toBeDefined();
    expect(url.url).toBe('https://www.google.com');
    expect(url.shortUrl).toHaveLength(6);
    expect(url.accessCount).toBe(0);
    expect(url.createdAt).toBeInstanceOf(Date);
    expect(url.updatedAt).toBeInstanceOf(Date);
    expect(url.deletedAt).toBeNull();
  });
});
