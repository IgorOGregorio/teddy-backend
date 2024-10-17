import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUrlService } from './deleteUrl.service';

describe('DeleteUrlService', () => {
  let service: DeleteUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUrlService],
    }).compile();

    service = module.get<DeleteUrlService>(DeleteUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
