import { useState } from 'react';
import TransactionList from './TransactionList';
import PortfolioGrid from './PortfolioGrid';

interface Props {
  address: string;
}

export default function DashboardTabs({ address }: Props) {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0); // 0 = inbound, 1 = outbound, 2 = portfolio

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
        <button
          onClick={() => setActiveTab(2)}
          className={`px-4 py-2 -mb-px ${activeTab === 2 ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        >
          Portfolio
        </button>
      </div>

      {/* Transaction List */}
      {/* Content */}
      {activeTab === 0 && <TransactionList address={address} txnDirection={0} />}
      {activeTab === 1 && <TransactionList address={address} txnDirection={1} />}
      {activeTab === 2 && <PortfolioGrid address={address} />}
    </div>
  );
}
