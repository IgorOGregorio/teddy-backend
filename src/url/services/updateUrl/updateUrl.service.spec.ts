import { UpdateUrlService } from './updateUrl.service';
import { urlModuleTest } from '../../utils/urlModuleTest';
import { IUrlRepository } from '../../repositories/iUrl.repository';
import { Url } from '../../entities/url.entity';

describe('UpdateUrlService', () => {
  let service: UpdateUrlService;
  let urlRepository: IUrlRepository;

  beforeEach(async () => {
    const module = await urlModuleTest();

    service = module.get<UpdateUrlService>(UpdateUrlService);
    urlRepository = module.get<IUrlRepository>(IUrlRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update url', async () => {
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

    const updatedUrl = new Url(
      {
        url: 'https://www.linkedin.com',
        shortUrl: 'http://localhost:3000/1',
        accessCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      id,
    );

    jest.spyOn(urlRepository, 'updateUrl').mockResolvedValue(updatedUrl);

    const result = await service.execute(
      id,
      { url: 'https://www.linkedin.com' },
      crypto.randomUUID(),
    );

    expect(result.url).toStrictEqual('https://www.linkedin.com');
  });

  it('should throw error if url not found', async () => {
    jest.spyOn(urlRepository, 'findUrlById').mockResolvedValue(null);

    await expect(
      service.execute(
        crypto.randomUUID(),
        { url: 'https://www.linkedin.com' },
        crypto.randomUUID(),
      ),
    ).rejects.toThrow('Url not found');
  });

  it('should throw error if user does not own the url', async () => {
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

    jest.spyOn(urlRepository, 'validateUserOwnsUrl').mockResolvedValue(false);

    await expect(
      service.execute(
        id,
        { url: 'https://www.linkedin.com' },
        crypto.randomUUID(),
      ),
    ).rejects.toThrow('User does not own the url');
  });

  it('should not update deleted url', async () => {
    const id = crypto.randomUUID();
    //mock repository
    const url = new Url(
      {
        url: 'https://www.google.com',
        shortUrl: 'http://localhost:3000/1',
        accessCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
      id,
    );

    jest.spyOn(urlRepository, 'findUrlById').mockResolvedValue(url);

    jest.spyOn(urlRepository, 'validateUserOwnsUrl').mockResolvedValue(true);

    expect(
      service.execute(
        id,
        { url: 'https://www.linkedin.com' },
        crypto.randomUUID(),
      ),
    ).rejects.toThrow('Cannot update a deleted URL');
  });
});
