import { CreateUrlService } from './createUrl.service';
import { urlModuleTest } from '../../utils/urlModuleTest';

describe('CreateUrlService', () => {
  let service: CreateUrlService;

  beforeEach(async () => {
    const module = await urlModuleTest();

    service = module.get<CreateUrlService>(CreateUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a url', async () => {
    const url = await service.execute({ url: 'https://www.google.com' });

    expect(url.id).toBeDefined();
    expect(url.url).toBe('https://www.google.com');
    expect(url.shortUrl).toHaveLength(6);
    expect(url.accessCount).toBe(0);
    expect(url.createdAt).toBeInstanceOf(Date);
    expect(url.updatedAt).toBeInstanceOf(Date);
    expect(url.deletedAt).toBeNull();
  });
});
