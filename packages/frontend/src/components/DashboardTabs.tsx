import { useState } from 'react';
import { TRANSACTION_CATEGORIES } from '../constants';
import TransactionList from './TransactionList';
import { Icon } from '../icons';

type Props = {
  address: string;
}

export default function DashboardTabs({ address }: Props) {
  const [activeTab, setActiveTab] = useState<0|1>(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  return (
    <div>
      {/* Toggle Button */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 0
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Icon name="circleArrowDown" className="size-6 fill-green-600" />
            <span>Inbound</span>
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 1
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Icon name="circleArrowUp" className="size-6 fill-red-600" />
            <span>Outbound</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 border-b">
        {TRANSACTION_CATEGORIES.map((category, index) => (
          <button
            onClick={() => setActiveCategoryIndex(index)}
            className={`cursor-pointer px-4 py-2 -mb-px ${activeCategoryIndex === index ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <TransactionList address={address} txnDirection={activeTab} categoryIndex={activeCategoryIndex} />
    </div>
  );
}
