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
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <ConnectButton />
      </div>
      <AddressInput onSubmit={setAddress} />

      <DashboardTabs address={address} />
    </div>
  );
}

export default App;
