import { Test, TestingModule } from '@nestjs/testing';
import { FindUrlsByUserIdService } from './findUrlsByUserId.service';

describe('FindUrlsByEmailService', () => {
  let service: FindUrlsByUserIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUrlsByUserIdService],
    }).compile();

    service = module.get<FindUrlsByUserIdService>(FindUrlsByUserIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
