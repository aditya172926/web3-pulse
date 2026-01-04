import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { BalanceInfo, getBalances } from '../services/portfolio';
import BalanceCard from './BalanceCard';
import { Icon } from '../icons';

type Props = {
    address: string;
}

export default function PortfolioGrid() {
    const { address } = useOutletContext<Props>();
    const [balances, setBalances] = useState<BalanceInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'balance' | 'value'>('value');

    useEffect(() => {
        if (!address) return;

        const fetchBalances = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getBalances(address);
                // filter zero balances
                const filtered = res.tokens.filter(b => b.tokenBalance !== '0' && b.tokenAddress !== null);
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

    // Calculate total portfolio value
    const totalValue = balances.reduce((sum, balance) => {
        return sum + parseFloat(balance.balanceUsd || '0');
    }, 0);

    // Filter balances based on search
    const filteredBalances = balances.filter(balance =>
        balance.tokenMetadata.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        balance.tokenMetadata.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        balance.tokenAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort balances
    const sortedBalances = [...filteredBalances].sort((a, b) => {
        if (sortBy === 'value') {
            return parseFloat(b.balanceUsd || '0') - parseFloat(a.balanceUsd || '0');
        }
        return parseFloat(b.formattedTokenBalance?.replace(/,/g, '') || '0') -
            parseFloat(a.formattedTokenBalance?.replace(/,/g, '') || '0');
    });

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

    // return (
    //     <div className='grid h-full grid-rows-[auto_1fr]'>
    //         <div className='grid grid-cols-2 gap-4 mb-3'>
    //             <div>Token Address</div>
    //             <div>Balance</div>
    //         </div>
    //         <div className='grid grid-cols-1'>
    //             {balances.map(balance => (
    //                 <BalanceCard balanceData={balance} />
    //             ))}
    //         </div>
    //     </div>
    // );

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Token Balances</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {balances.length} tokens
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Total Portfolio Value</p>
                        <p className="text-3xl font-bold text-gray-900">
                            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Icon name="search" className="size-4 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by token name, symbol, or address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'balance' | 'value')}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="value">Sort by USD Value</option>
                        <option value="balance">Sort by Token Balance</option>
                    </select>
                </div>
            </div>

            {/* Balance List */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                    {sortedBalances.length === 0 ? (
                        <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
                            <div className="text-center">
                                <p className="text-gray-500 mb-2">No tokens found</p>
                                <p className="text-sm text-gray-400">Try adjusting your search</p>
                            </div>
                        </div>
                    ) : (
                        sortedBalances.map((balance, index) => (
                            <BalanceCard key={index} balanceData={balance} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
