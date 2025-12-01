import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class TransactionData {
    from: string;
    to: string;
    transaction_hash: string;
    block_number: number;
    timestamp: number;
    transaction_fee: number;
    gas_price: number;
    gas_fees: number
}

export class TransactionSummary {
    from: string;
    to: string;
    transaction_hash: string;
}

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageKey: string = '0x0';

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 20;
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