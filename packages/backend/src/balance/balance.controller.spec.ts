import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { EvmaddressPipe } from 'src/pipes/evmaddress/evmaddress.pipe';

describe('BalanceController', () => {
  let controller: BalanceController;
  let service: BalanceService;

  const mockBalanceService = {
    fetch_balances: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [
        {
          provide: BalanceService,
          useValue: mockBalanceService,
        },
        EvmaddressPipe,
      ],
    }).compile();

    controller = module.get<BalanceController>(BalanceController);
    service = module.get<BalanceService>(BalanceService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call BalanceService.fetch_balances with correct address', async () => {
    const address = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';

    const fakeResponse = {
      user_address: address,
      balances: [
        { token_contract_address: '0x123', balance: '1000' },
      ],
    };

    mockBalanceService.fetch_balances.mockResolvedValue(fakeResponse);

    const result = await controller.fetch_balances(address);

    expect(service.fetch_balances).toHaveBeenCalledWith(address);
    expect(result).toEqual(fakeResponse);
  });
});
