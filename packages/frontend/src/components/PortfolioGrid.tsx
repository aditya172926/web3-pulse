import { useEffect, useState } from 'react';
import { getBalances, BalanceData } from '../services/portfolio';
import BalanceCard from './BalanceCard';
import { useOutletContext } from 'react-router';

type Props = {
    address: string;
}

export default function PortfolioGrid() {
    const {address} = useOutletContext<Props>();
    const [balances, setBalances] = useState<BalanceData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!address) return;

        const fetchBalances = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getBalances(address);
                // filter zero balances
                const filtered = res.filter(b => b.balance !== '0');
                setBalances(filtered);
            } catch (err: any) {
                console.error(err);
                setError('Failed to fetch balances');
            } finally {
                setLoading(false);
            }
        };

        fetchBalances();
    }, [address]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-sm text-gray-600">Loading Portfolio</p>
        </div>
    );

    if (balances.length === 0 || error) return (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="mt-3 text-sm text-gray-600">No balances found</p>
        </div>
    );

    return (
        <div className='grid h-full grid-rows-[auto_1fr]'>
            <div className='grid grid-cols-2 gap-4 mb-3'>
                <div>Token Address</div>
                <div>Balance</div>
            </div>
            <div className='grid grid-cols-1'>
                {balances.map(balance => (
                    <BalanceCard balanceData={balance}/>
                ))}
            </div>
        </div>
    );
}
