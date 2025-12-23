import { format_slice } from "../helper";
import { Transaction } from "../interfaces";

interface Props {
  tx: Transaction;
  type: 'inbound' | 'outbound';
  onClick: (tx: Transaction) => void;
}

export default function TransactionCard({ tx, type, onClick }: Props) {
  const isInbound = type === 'inbound';

  return (
    <div
      className="grid grid-cols-6 gap-4 py-3 pl-1 cursor-pointer hover:shadow-md transition"
      onClick={() => onClick(tx)}
    >
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.transaction_hash)}
      </div>
      <div className="text-sm">
        {isInbound ? <p>IN</p> : <p>OUT</p>}
      </div>
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.from)}
      </div>
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.to)}
      </div>
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.category)}
      </div>
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.block_number)}
      </div>
    </div>
  );
}
