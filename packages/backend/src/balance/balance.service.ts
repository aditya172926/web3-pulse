import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { BalanceData } from './balance.dto';
import { BALANCE_CACHE_PREFIX, CACHE_BALANCE_TIME } from 'src/configs/constants';

@Injectable()
export class BalanceService {
    private readonly logger = new Logger(BalanceService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async fetch_balances(address: string) {
        const cached_balances = await this.cacheManager.get(`${BALANCE_CACHE_PREFIX}${address}`);
        if (cached_balances) {
            this.logger.log(`Returning cached balance for address ${address}`);
            return cached_balances;
        }

        const alchemy_api = `${process.env.ALCHEMY_BASE_URL}/${process.env.ALCHEMY_API_KEY}`;

        const payload = {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "alchemy_getTokenBalances",
            "params": [address],
        }

        try {
            const result = this.httpService.post(alchemy_api, payload);
            const { data } = await firstValueFrom(result);
            const raw_balance = data?.result?.tokenBalances;
            const balances: BalanceData[] = raw_balance.map((balance) => ({
                token_contract_address: balance.contractAddress,
                balance: this.hexToInteger(balance.tokenBalance)
            })).filter(b => b.balance !== '0');

            await this.cacheManager.set(`${BALANCE_CACHE_PREFIX}${address}`, balances, CACHE_BALANCE_TIME);
            this.logger.log(`Returning fetched balances for address ${address}`);
            return balances;
        } catch (error) {
            this.logger.error(`Error in fetching balances for address ${address}, error: ${error}`);
            throw new HttpException(
                {
                    message: "Failed to fetch balances for the address",
                    error: error?.message ?? error.toString(),
                    address
                },
                HttpStatus.BAD_GATEWAY
            );
        }
    }

    hexToInteger(hex: string): string {
        if (!hex || hex === "0x" || hex === "0x0") return "0";
        return BigInt(hex).toString();
    }
}
