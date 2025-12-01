import { Transaction } from "../interfaces";

interface Props {
    tx: Transaction;
    type: 'inbound' | 'outbound';
    onClick: (tx: Transaction) => void;
  }
  
  export default function TransactionCard({ tx, type, onClick }: Props) {
    const isInbound = type === 'inbound';
    const bgColor = isInbound ? 'bg-green-50' : 'bg-red-50';
    const borderColor = isInbound ? 'border-green-200' : 'border-red-200';
  
    return (
      <div
        className={`w-full p-6 border ${borderColor} rounded mb-4 ${bgColor} shadow-sm cursor-pointer hover:shadow-md transition mx-auto`}
        onClick={() => onClick(tx)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{isInbound ? 'Received' : 'Sent'}</span>
            <span className="ml-1 font-medium">{tx.value} {tx.asset || 'ETH'}</span>
          </div>
          <div className="text-sm text-gray-500">
            {tx.block_timestamp || 'N/A'}
          </div>
        </div>
  
        <div className="mt-2 text-sm text-gray-700 font-medium">
          Category: {tx.category}
        </div>
  
        <div className="text-sm text-gray-600 mt-1 break-all">
          Hash: {tx.transaction_hash}
        </div>
        <div className="text-sm text-gray-600 break-all">
          From: {tx.from} → To: {tx.to}
        </div>
      </div>
    );
  }
  