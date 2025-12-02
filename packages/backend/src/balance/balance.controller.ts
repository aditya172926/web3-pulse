import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { EvmaddressPipe } from 'src/pipes/evmaddress/evmaddress.pipe';
import { Throttle } from '@nestjs/throttler';

@Controller('balance')
export class BalanceController {
    constructor(
        private balanceService: BalanceService
    ) {}

    @Get(':address')
    async fetch_balances(
        @Param('address', EvmaddressPipe) address: string,
    ) {
        return await this.balanceService.fetch_balances(address);
    }
}
