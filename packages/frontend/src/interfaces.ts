export interface RawContract {
    value: string | null;
    address: string | null;
    decimal: string | null;
}

export interface TransactionMetadata {
    blockTimestamp: string
}

export interface Transaction {
    blockNum: string;           // hex
    blockNumberDecimal: number; // added for sorting
    uniqueId: string;
    hash: string;
    from: string;
    to: string;
    value: number;
    erc721TokenId: string | null;
    erc1155Metadata: any | null;
    tokenId: string | null;
    asset: string | null;
    category: string;
    rawContract: RawContract;
    metadata: TransactionMetadata;
}


export interface TransactionResponse {
    data: Transaction[];
    nextPageKey: string | null;
}

export interface GetTransactionsParams {
    txnDirection: 0 | 1;
    limit?: number;
    pageKey?: string;
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
