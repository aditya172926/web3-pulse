export interface AlchemyBalanceRequest {
    addresses: QueryAddresses[]
}

export interface QueryAddresses {
    address: string,
    networks: string[]
}

export interface BalanceResponse {
    tokens: BalanceInfo[]
}

export interface BalanceInfo {
    address: string,
    network: string,
    tokenAddress: string,
    tokenBalance: string,
    balanceUsd?: string,
    tokenMetadata: TokenMetadata,
    tokenPrices: TokenPrices[]
}

export interface TokenMetadata {
    symbol: string | null,
    decimals: string | null,
    name: string | null,
    logo: string | null
}

export interface TokenPrices {
    currency: string,
    value: string,
    lastUpdateAt: string
}