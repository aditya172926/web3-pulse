import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { EvmaddressPipe } from 'src/pipes/evmaddress/evmaddress.pipe';
import { TransactionHashPipe } from 'src/pipes/transaction_hash/transaction_hash.pipe';
import { PaginationDto } from './transactions.dto';

@Controller('transaction')
export class TransactionsController {

    constructor(
        private transactionService: TransactionsService
    ) {}

    @Get('history/:direction/:address')
    async fetch_transactions(
        @Param('direction') txn_direction: number,
        @Param('address', EvmaddressPipe) address: string,
        @Query() query: PaginationDto
    ) {
        return await this.transactionService.fetch_user_transactions(address, txn_direction, query);
    }

    @Get('info/:transaction_hash')
    async fetch_transaction_data(@Param('transaction_hash', TransactionHashPipe) transaction_hash: string) {
        return await this.transactionService.fetch_transaction_data(transaction_hash);
    }

    @Get('balances/:address')
    async fetch_balances(@Param('address', EvmaddressPipe) address: string) {
        
    }
}
