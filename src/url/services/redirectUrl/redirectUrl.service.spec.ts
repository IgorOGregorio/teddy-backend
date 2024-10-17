import { RedirectUrlService } from './redirectUrl.service';
import { urlModuleTest } from '../../utils/urlModuleTest';
import { IUrlRepository } from '../../repositories/iUrl.repository';
import { Url } from '../../entities/url.entity';

describe('RedirectUrlService', () => {
  let service: RedirectUrlService;
  let urlRepository: IUrlRepository;

  beforeEach(async () => {
    const module = await urlModuleTest();

    service = module.get<RedirectUrlService>(RedirectUrlService);
    urlRepository = module.get<IUrlRepository>(IUrlRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should redirect to url', async () => {
    const id = crypto.randomUUID();
    const shortUrl = 'http://localhost:3000/1';
    //mock repository
    const url = new Url(
      {
        url: 'https://www.google.com',
        shortUrl: 'http://localhost:3000/1',
        accessCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      id,
    );

    jest.spyOn(urlRepository, 'findBySortUrl').mockResolvedValue(url);

    jest.spyOn(urlRepository, 'updateUrl').mockResolvedValue(url);

    const result = await service.execute(shortUrl);

    expect(result).toStrictEqual('https://www.google.com');
  });
});
