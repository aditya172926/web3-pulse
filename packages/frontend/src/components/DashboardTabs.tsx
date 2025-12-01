import { useState } from 'react';
import TransactionList from './TransactionList';

interface Props {
  address: string;
}

export default function DashboardTabs({ address }: Props) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0); // 0 = inbound, 1 = outbound

  return (
    <div>
      {/* Tabs */}
      <div className="flex mb-4 border-b">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-4 py-2 -mb-px ${activeTab === 0 ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        >
          Inbound
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 -mb-px ${activeTab === 1 ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        >
          Outbound
        </button>
      </div>

      {/* Transaction List */}
      <TransactionList address={address} txnDirection={activeTab} />
    </div>
  );
}
