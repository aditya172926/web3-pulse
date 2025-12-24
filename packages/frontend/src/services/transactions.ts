import axios from 'axios';
import { GetTransactionsParams, TransactionReceiptResult, TransactionResponse } from '../interfaces';

export async function getTransactions(
    address: string,
    { txnDirection, limit = 20, pageKey = "0x0" }: GetTransactionsParams
): Promise<TransactionResponse> {
    const res = await axios.get<TransactionResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/transaction/history/${txnDirection}/${address}`,
        {
            params: {
                limit,
                pageKey,
            },
        }
    );
    return res.data;
}

export async function getTransactionReceipt(transaction_hash: string): Promise<TransactionReceiptResult> {
    const res = await axios.get<TransactionReceiptResult>(
        `${import.meta.env.VITE_BACKEND_API_URL}/transaction/info/${transaction_hash}`
    );
    return res.data;
}