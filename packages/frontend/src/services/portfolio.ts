import axios from 'axios';

export interface BalanceData {
  token_contract_address: string;
  balance: string;
}

export interface BalanceResponse {
  tokens: BalanceInfo[]
}

export interface BalanceInfo {
  address: string,
  network: string,
  tokenAddress: string,
  tokenBalance: string,
  formattedTokenBalance?: string,
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

const backend_api_url = import.meta.env.VITE_BACKEND_API_URL;

export async function getBalances(address: string): Promise<BalanceResponse> {
  const res = await axios.get<BalanceResponse>(`${backend_api_url}/balance/${address}`);
  return res.data;
}
