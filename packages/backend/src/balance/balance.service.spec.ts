import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpClientService } from 'src/http-client/http-client.service';

describe('Balance', () => {
  let provider: BalanceService;

  const mockHttpService = {
    post: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        { provide: HttpClientService, useValue: mockHttpService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    provider = module.get<BalanceService>(BalanceService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
