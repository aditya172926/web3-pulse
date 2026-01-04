import { NavLink, useNavigate } from "react-router";
import { TRANSACTION_BADGE_COLOR } from "../constants";
import { format_slice } from "../helper";
import { Transaction } from "../interfaces";
import Badge from "./Badge";
import { useSelectedTransaction } from "../state";

interface Props {
  tx: Transaction;
  type: 'inbound' | 'outbound';
}

export default function TransactionCard({ tx, type }: Props) {
  const isInbound = type === 'inbound';
  const navigate = useNavigate();
  const setSelectedTransaction = useSelectedTransaction((state) => state.setTransaction);

  function navigateToTxnDetails(tx: Transaction) {
    setSelectedTransaction(tx);
    navigate(`transaction/${tx.transaction_hash}`);
  }

  return (
    <div
      className="grid grid-cols-6 gap-4 py-3 pl-1 cursor-pointer hover:shadow-md transition"
      onClick={() => navigateToTxnDetails(tx)}
    >
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.transaction_hash)}
      </div>
      <div className="text-sm">
        {isInbound ?
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-green-600">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-red-600">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
          </svg>
        }
      </div>
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.from)}
      </div>
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.to)}
      </div>
      <div className="text-sm text-gray-600 break-all">
        <Badge text={tx.category} backgroundColor={TRANSACTION_BADGE_COLOR[tx.category]}/>
      </div>
      <div className="text-sm text-gray-600 break-all">
        {format_slice(tx.block_number)}
      </div>
    </div>
  );
}
