import { useEffect, useState } from 'react';
import { TRANSACTION_CATEGORIES } from '../constants';
import { Transaction } from '../interfaces';
import { getTransactions } from '../services/transactions';
import TransactionCard from './TransactionCard';

interface Props {
  address: string;
  txnDirection: 0 | 1; // 0 = inbound, 1 = outbound
  categoryIndex: number;
}

export default function TransactionList({ address, txnDirection, categoryIndex }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({});
  const [error, setError] = useState('');
  const [pageKey, setPageKey] = useState<string | null>('0x0');

  const fetchData = async (reset = true) => {
    setLoading(true);
    setError('');
    if (reset) {
      setTransactions({});
    }
    let nextPageKey = reset ? '0x0' : pageKey;
    try {
      const res = await getTransactions(address, { txnDirection, limit: 5, pageKey: nextPageKey });
      console.log("res ", res);
      // setTransactions(prev => {...(reset ? {} : prev), ...res.transactions});
      if (!reset) {
        let transactionsData: Record<string, Transaction[]> = {};
        TRANSACTION_CATEGORIES.map((category) => {
          transactionsData[category] = transactions[category].concat(res.transactions[category]);
        });
        console.log("after grouping data ", transactionsData);
        setTransactions(transactionsData);
      } else {
        setTransactions(res.transactions);
      }
      setPageKey(res.pageKey);
    } catch (err: any) {
      setError(err?.response.data.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) return;
    fetchData(true);
  }, [address, txnDirection]);

  return (
    <div>
      {error && (
        <div className="my-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-sm text-gray-600">Loading transactions...</p>
        </div>
      ) : (
        <>
          {!transactions[TRANSACTION_CATEGORIES[categoryIndex]] ? <p>No transactions found.</p> : (
            <>
              <div className='grid h-full grid-rows-[auto_1fr]'>
                <div className='grid grid-cols-6 gap-4'>
                  <div>Hash</div>
                  <div>Direction</div>
                  <div>From</div>
                  <div>To</div>
                  <div>Category</div>
                  <div>Block</div>
                </div>
                <div className="grid grid-cols-1">
                  {transactions[TRANSACTION_CATEGORIES[categoryIndex]].map((tx, index) => (
                    <TransactionCard key={index} tx={tx} type={txnDirection === 0 ? 'inbound' : 'outbound'} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-10">
                <button
                  disabled={!pageKey || loading}
                  onClick={() => fetchData(false)} // `false` = append
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            </>
          )}
        </>
      )
      }
    </div >
  );
}
