import { useEffect, useState } from 'react';
import AddressInput from './components/AddressInput';
import DashboardTabs from './components/DashboardTabs';
import '@rainbow-me/rainbowkit/styles.css';


import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';


function App() {
  const [address, setAddress] = useState('');
  const { address: connectedAddress, isConnected } = useAccount();


  // Automatically use connected wallet unless user overrides
  useEffect(() => {
    if (isConnected && connectedAddress) {
      setAddress(connectedAddress);
    }
  }, [isConnected, connectedAddress]);

  return (
    <div className="mx-auto p-6">
      <div className='flex'>
        <div className='flex-1 px-3'>
          <AddressInput onSubmit={setAddress} />
        </div>
        <div className='flex-3'>
          <DashboardTabs address={address} />
        </div>
      </div>
    </div>
  );
}

export default App;
