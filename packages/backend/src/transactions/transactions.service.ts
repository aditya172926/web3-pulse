import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto, TransactionSummary } from './transactions.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TRANSACTION_CATEGORIES } from 'src/configs/constants';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    async fetch_user_transactions(
        address: string,
        transaction_direction: number,
        pagination: PaginationDto
    ) {
        const {pageKey, limit} = pagination;
        const alchemy_api = `${process.env.ALCHEMY_BASE_URL}/${process.env.ALCHEMY_API_KEY}`;

        const base_payload = {
                jsonrpc: "2.0",
                method: "alchemy_getAssetTransfers",
            };

        let payload = {
            id: 1,
            params: {
                excludeZeroValue: false,
                category: TRANSACTION_CATEGORIES,
                contractAddresses: [],
                withMetadata: true,
                order: 'desc',
                maxCount: `0x${limit.toString(16)}`,
                pageKey: `0x${pageKey.toString(16)}`
            },
            ...base_payload
        };

        if (transaction_direction == 0) {
            // inbound transactions
            payload.params['toAddress'] = address;
        } else {
            // outbound transactions
            payload.params['fromAddress'] = address;
        }

        try {
            const response = this.httpService.post(alchemy_api, payload);
            const {data} = await firstValueFrom(response);
            const transactions = data?.result.transfers ?? [];

            return transactions;
        } catch (error) {
            throw new HttpException(
                {
                    message: "Failed to fetch address historical transactions",
                    error: error?.message ?? error.toString(),
                    address
                },
                HttpStatus.BAD_GATEWAY
            );
        }
    }
    
    async fetch_transaction_data(transaction_hash: string) {
        const alchemy_api = `${process.env.ALCHEMY_BASE_URL}/${process.env.ALCHEMY_API_KEY}`;

        const transaction_receipt_payload = {
            id: 1,
            jsonrpc: "2.0",
            method: "eth_getTransactionReceipt",
            params: [transaction_hash]
        };

        try {
            const response = this.httpService.post(alchemy_api, transaction_receipt_payload);
            let {data} = await firstValueFrom(response);
            return data;
        } catch (error) {
            throw new HttpException(
                {
                    message: "Failed to fetch transaction receipt for transaction hash",
                    error: error?.message ?? error.toString(),
                    transaction_hash
                },
                HttpStatus.BAD_GATEWAY
            );
        }
    }
}
