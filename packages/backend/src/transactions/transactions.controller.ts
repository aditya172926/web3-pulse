import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { EvmaddressPipe } from 'src/pipes/evmaddress/evmaddress.pipe';
import { TransactionHashPipe } from 'src/pipes/transaction_hash/transaction_hash.pipe';

@Controller('transaction')
export class TransactionsController {

    constructor(
        private transactionService: TransactionsService
    ) {}

    @Get('history/:address')
    async fetch_transactions(@Param('address', EvmaddressPipe) address: string) {
        return await this.transactionService.fetch_user_transactions(address);
    }

    @Get('info/:transaction_hash')
    async fetch_transaction_data(@Param('transaction_hash', TransactionHashPipe) transaction_hash: string) {
        return await this.transactionService.fetch_transaction_data(transaction_hash);
    }
}
