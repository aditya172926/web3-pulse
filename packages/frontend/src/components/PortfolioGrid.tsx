import { useEffect, useState } from 'react';
import { getBalances, BalanceData } from '../services/portfolio';

interface Props {
    address: string;
}

export default function PortfolioGrid({ address }: Props) {
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

    if (loading) return <p>Loading portfolio...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (balances.length === 0) return <p>No balances found</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {balances.map(b => (
                <div
                    key={b.token_contract_address}
                    className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow hover:shadow-lg border border-blue-100 transition-shadow cursor-pointer"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold truncate">{b.token_contract_address}</p>
                    </div>
                    <p className="text-xl font-bold text-gray-800">
                        {parseFloat(b.balance).toFixed(4)} {/* truncate to 4 decimals */}
                    </p>
                </div>
            ))}

        </div>
    );
}
