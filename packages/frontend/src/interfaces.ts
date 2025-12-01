export interface RawContract {
    value: string | null;
    address: string | null;
    decimal: string | null;
}

export interface TransactionMetadata {
    blockTimestamp: string
}

export interface Transaction {
    from: string;
    to: string;
    value: string;
    transaction_hash: string;
    block_number: string;
    block_timestamp: string;
    category: string;
    asset: string;
    erc721_token_id?: string;
    erc1155_metadata?: string;
    token_id?: string;
}


export interface TransactionResponse {
    transactions: Transaction[];
    pageKey: string | null;
}

export interface GetTransactionsParams {
    txnDirection: 0 | 1;
    limit?: number;
    pageKey: string | null;
}

export interface TransactionReceipt {
    jsonrpc: string;
    id: number;
    result: TransactionReceiptResult;
}

export interface TransactionReceiptResult {
    type: string;                      // e.g. "0x2"
    status: string;                    // "0x1" = success, "0x0" = failed
    cumulativeGasUsed: string;         // hex string
    logs: any[];                       // empty array or structured logs (can type later)
    logsBloom: string;                 // big bloom filter hex
    transactionHash: string;
    transactionIndex: string;          // hex string
    blockHash: string;
    blockNumber: string;               // hex string
    gasUsed: string;                   // hex string
    effectiveGasPrice: string;         // hex string
    from: string;
    to: string | null;
    contractAddress: string | null;
}
