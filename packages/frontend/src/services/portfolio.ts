import axios from 'axios';
import { BACKEND_BASE_URL } from '../constants';

export interface BalanceData {
  token_contract_address: string;
  balance: string;
}

export async function getBalances(address: string): Promise<BalanceData[]> {
  const res = await axios.get<BalanceData[]>(`${BACKEND_BASE_URL}/balance/${address}`);
  return res.data;
}
