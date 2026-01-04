import { useNavigate } from "react-router";
import { TRANSACTION_BADGE_COLOR } from "../constants";
import { format_slice } from "../helper";
import { Transaction } from "../interfaces";
import { useSelectedTransaction } from "../state";
import Badge from "./Badge";
import { Icon } from "../icons";

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
          <Icon name="circleArrowDown" className="size-6 fill-green-600" />
          :
          <Icon name="circleArrowUp" className="size-6 fill-red-600" />
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
