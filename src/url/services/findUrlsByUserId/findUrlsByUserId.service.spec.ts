import { FindUrlsByUserIdService } from './findUrlsByUserId.service';
import { urlModuleTest } from '../../utils/urlModuleTest';
import { Url } from '../../entities/url.entity';
import { IUrlRepository } from '../../repositories/iUrl.repository';

describe('FindUrlsByEmailService', () => {
  let service: FindUrlsByUserIdService;
  let urlRepository: IUrlRepository;

  beforeEach(async () => {
    const module = await urlModuleTest();

    service = module.get<FindUrlsByUserIdService>(FindUrlsByUserIdService);
    urlRepository = module.get<IUrlRepository>(IUrlRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find urls by user id', async () => {
    const userId = crypto.randomUUID();
    //mock repository
    const urls = [
      new Url(
        {
          url: 'https://www.google.com',
          shortUrl: 'http://localhost:3000/1',
          accessCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        crypto.randomUUID(),
      ),
      new Url(
        {
          url: 'https://www.linkedin.com',
          shortUrl: 'http://localhost:3000/2',
          accessCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        crypto.randomUUID(),
      ),
    ];

    jest.spyOn(urlRepository, 'findUrlsByUserId').mockResolvedValue(urls);

    const result = await service.execute(userId);

    expect(result).toStrictEqual(urls);
  });
});
