import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUrlService } from './updateUrl.service';

describe('UpdateUrlService', () => {
  let service: UpdateUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUrlService],
    }).compile();

    service = module.get<UpdateUrlService>(UpdateUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
