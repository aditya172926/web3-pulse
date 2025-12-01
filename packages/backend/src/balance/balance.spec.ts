import { Test, TestingModule } from '@nestjs/testing';
import { Balance } from './balance';

describe('Balance', () => {
  let provider: Balance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Balance],
    }).compile();

    provider = module.get<Balance>(Balance);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
