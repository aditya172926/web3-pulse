import axios from 'axios';
import { BACKEND_BASE_URL } from '../constants';
import { GetTransactionsParams, TransactionReceipt, TransactionResponse } from '../interfaces';

export async function getTransactions(
    address: string,
    { txnDirection, limit = 20, pageKey = "0x0" }: GetTransactionsParams
): Promise<TransactionResponse> {
    const res = await axios.get<TransactionResponse>(
        `${BACKEND_BASE_URL}/transaction/history/${txnDirection}/${address}`,
        {
            params: {
                limit,
                pageKey,
            },
        }
    );
    return res.data;
}

export async function getTransactionReceipt(transaction_hash: string): Promise<TransactionReceipt> {
    const res = await axios.get<TransactionReceipt>(
        `${BACKEND_BASE_URL}/transaction/info/${transaction_hash}`
    );
    return res.data;
}