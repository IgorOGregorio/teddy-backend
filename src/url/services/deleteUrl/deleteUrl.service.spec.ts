import { DeleteUrlService } from './deleteUrl.service';
import { urlModuleTest } from '../../utils/urlModuleTest';
import { IUrlRepository } from '../../repositories/iUrl.repository';
import { Url } from '../../entities/url.entity';

describe('DeleteUrlService', () => {
  let service: DeleteUrlService;
  let urlRepository: IUrlRepository;

  beforeEach(async () => {
    const module = await urlModuleTest();
    service = module.get<DeleteUrlService>(DeleteUrlService);
    urlRepository = module.get<IUrlRepository>(IUrlRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a url', async () => {
    const id = crypto.randomUUID();
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

    jest.spyOn(urlRepository, 'findUrlById').mockResolvedValue(url);

    jest.spyOn(urlRepository, 'validateUserOwnsUrl').mockResolvedValue(true);

    jest.spyOn(urlRepository, 'deleteUrl').mockResolvedValue();

    const deletedUrl = await service.execute(url.id, crypto.randomUUID());

    expect(deletedUrl).toStrictEqual({ message: 'Url deleted' });
  });
});
