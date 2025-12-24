import axios from 'axios';

export interface BalanceData {
  token_contract_address: string;
  balance: string;
}

const backend_api_url = import.meta.env.VITE_BACKEND_API_URL;

export async function getBalances(address: string): Promise<BalanceData[]> {
  const res = await axios.get<BalanceData[]>(`${backend_api_url}/balance/${address}`);
  return res.data;
}
