import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from './http-client.service';
import { HttpService } from '@nestjs/axios';

describe('HttpClientService', () => {
  let service: HttpClientService;

  const mockHttpService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpClientService,
        { provide: HttpService, useValue: mockHttpService }
      ],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
