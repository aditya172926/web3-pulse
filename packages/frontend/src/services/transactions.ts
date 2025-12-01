import axios from 'axios';
import { BACKEND_BASE_URL } from '../constants';
import { GetTransactionsParams, Transaction, TransactionReceipt } from '../interfaces';

export async function getTransactions(
    address: string,
    { txnDirection, limit = 20, pageKey = "1" }: GetTransactionsParams
): Promise<Transaction[]> {
    const res = await axios.get<Transaction[]>(
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
    console.log("transaction hash ", transaction_hash);
    const res = await axios.get<TransactionReceipt>(
        `${BACKEND_BASE_URL}/transaction/info/${transaction_hash}`
    );
    console.log("res ", res);
    return res.data;
}