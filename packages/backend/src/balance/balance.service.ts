import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { BALANCE_CACHE_PREFIX, CACHE_BALANCE_TIME } from 'src/configs/constants';
import { AlchemyBalanceRequest, BalanceInfo, BalanceResponse } from './balance.types';
import { HttpClientService } from 'src/http-client/http-client.service';

@Injectable()
export class BalanceService {
    private readonly logger = new Logger(BalanceService.name);

    constructor(
        private readonly httpService: HttpClientService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async fetch_balances(address: string) {
        const cached_balances = await this.cacheManager.get(`${BALANCE_CACHE_PREFIX}${address}`);
        if (cached_balances) {
            this.logger.log(`Returning cached balance for address ${address}`);
            return cached_balances;
        }
        this.logger.debug(`Cache miss for address: ${address}, fetching from API`);
        return this.fetchFromAlchemy(address);
    }

    private async fetchFromAlchemy(address: string): Promise<BalanceResponse> {
        const alchemy_api = `${process.env.ALCHEMY_DATA_API_BASE_URL}/${process.env.ALCHEMY_API_KEY}/assets/tokens/by-address`;

        const payload: AlchemyBalanceRequest = {
            addresses: [
                {
                    address: address,
                    networks: ["eth-mainnet"]
                }
            ]
        }

        const result = this.httpService.post(alchemy_api, payload, {
            timeoutMs: 10000,
            retries: 3,
            retryDelay: 1000
        });
        const { data } = await firstValueFrom(result);
        // Validate response
        if (!data?.data?.tokens) {
            throw new Error('Invalid response structure from Alchemy API');
        }

        const balances: BalanceResponse = data.data.tokens;
        await this.cacheManager.set(`${BALANCE_CACHE_PREFIX}${address}`, balances, CACHE_BALANCE_TIME);
        this.logger.log(`Successfully fetched balances for address: ${address}`);
        return balances;
    }

    hexToInteger(hex: string): string {
        if (!hex || hex === "0x" || hex === "0x0") return "0";
        return BigInt(hex).toString();
    }
}
