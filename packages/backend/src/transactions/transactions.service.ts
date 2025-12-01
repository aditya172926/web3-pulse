import { Injectable } from '@nestjs/common';
import { TransactionSummary } from './transactions.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TRANSACTION_CATEGORIES } from 'src/configs/constants';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    async fetch_user_transactions(address: string) {
        const alchemy_api = `${process.env.ALCHEMY_BASE_URL}/${process.env.ALCHEMY_API_KEY}`;

        const base_payload = {
                jsonrpc: "2.0",
                method: "alchemy_getAssetTransfers",
            };

        const inbound_payload = {
            id: 1,
            params: {
                toAddress: address,
                excludeZeroValue: false,
                category: TRANSACTION_CATEGORIES,
                contractAddresses: [],
                withMetadata: true
            },
            ...base_payload
        };

        const outbound_payload = {
            id: 2,
            params: {
                fromAddress: address,
                excludeZeroValue: false,
                category: TRANSACTION_CATEGORIES,
                contractAddresses: [],
                withMetadata: true
            },
            ...base_payload
        };

        const batch_payload = [
            inbound_payload,
            outbound_payload
        ];

        const response = this.httpService.post(alchemy_api, batch_payload);
        const {data} = await firstValueFrom(response);
        const incoming_transactions = data[0]?.result.transfers ?? [];
        const outgoing_transactions = data[1]?.result.transfers ?? [];

        const all_transactions = [...incoming_transactions, ...outgoing_transactions];
        return all_transactions;
    }
}
