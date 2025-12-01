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
    pageKey: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 20;
}