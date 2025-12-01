import { useState, useEffect } from 'react';
import { getTransactionReceipt, getTransactions } from '../services/transactions';
import TransactionCard from './TransactionCard';
import { TransactionDetailsModal } from './TransactionDetailsModal';
import { Transaction, TransactionReceipt } from '../interfaces';

interface Props {
  address: string;
  txnDirection: 0 | 1; // 0 = inbound, 1 = outbound
}

export default function TransactionList({ address, txnDirection }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setLoading(true);
      setTransactions([]);
      setError('');
      try {
        const res = await getTransactions(address, { txnDirection, limit: 20 });
        console.log(res);
        setTransactions(res);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, txnDirection]);


  const openModal = async (txn: Transaction) => {
    setSelectedTxn(txn);
    setModalOpen(true);

    // Fetch receipt
    const data = await getTransactionReceipt(txn.hash);
    setReceipt(data);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTxn(null);
    setReceipt(null);
  };

  return (
    <div>
      {loading && (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-sm text-gray-600">Loading transactions...</p>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && transactions.length === 0 && <p>No transactions found.</p>}

      {transactions.map(tx => (
        <TransactionCard key={tx.hash} tx={tx} type={txnDirection === 0 ? 'inbound' : 'outbound'} onClick={openModal}/>
      ))}

    <TransactionDetailsModal
      open={modalOpen}
      onClose={closeModal}
      txn_data={selectedTxn}
      receipt={receipt}
    />
    </div>
  );
}
