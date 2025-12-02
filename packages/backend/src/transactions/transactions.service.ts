import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { PaginationDto, TransactionData, TransactionHistoryResult, TransactionReceiptResult } from './transactions.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CACHE_TRANSACTION_RECEIPTS_TIME, TRANSACTION_CATEGORIES } from 'src/configs/constants';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TransactionDirection } from 'src/configs/enums';

@Injectable()
export class TransactionsService {
    private readonly logger = new Logger(TransactionsService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
                pageKey: pageKey
            },
            ...base_payload
        };

        if (transaction_direction == TransactionDirection.INBOUND) {
            // inbound transactions
            payload.params['toAddress'] = address;
        } else {
            // outbound transactions
            payload.params['fromAddress'] = address;
        }

        try {
            const response = this.httpService.post(alchemy_api, payload);
            const {data} = await firstValueFrom(response);
            let raw_transactions = data?.result.transfers ?? [];

            const transactions: TransactionData[] = raw_transactions.map((tx) => ({
                from: tx.from,
                to: tx.to,
                value: tx?.value ? tx?.value.toString() : "0",
                transaction_hash: tx?.hash,
                block_number: tx?.blockNum,
                block_timestamp: tx.metadata?.blockTimestamp,
                category: tx?.category,
                asset: tx?.asset,
                erc721_token_id: tx?.erc721TokenId,
                erc1155_metadata: tx?.erc1155Metadata,
                token_id: tx?.tokenId,
            }));

            const pageKey = data?.result.pageKey;
            const txn_result: TransactionHistoryResult = {
                transactions,
                pageKey
            }
            this.logger.log(`Returning user transaction history with address ${address}`);
            return txn_result;
        } catch (error) {
            this.logger.error(`Error in fetching transaction history ${error}`);
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

        const cached_transaction_receipt = await this.cacheManager.get(transaction_hash);
        if (cached_transaction_receipt) {
            return cached_transaction_receipt;
        }

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
            const result: TransactionReceiptResult = data.result;
            await this.cacheManager.set(transaction_hash, result, CACHE_TRANSACTION_RECEIPTS_TIME);
            this.logger.log(`Returning transaction data for transaction hash ${transaction_hash}`);
            return result;
        } catch (error) {
            this.logger.error(`Error in fetching transaction receipt data with transaction hash ${transaction_hash}, error: ${error}`);
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
