import { useEffect, useState } from 'react';
import AddressInput from './components/AddressInput';
import DashboardTabs from './components/DashboardTabs';
import '@rainbow-me/rainbowkit/styles.css';


import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSelectedAddress } from './state';
import Sidebar from './components/Sidebar';


function App() {
  // const [address, setAddress] = useState('');
  const zustand_address = useSelectedAddress((state) => state.address);
  const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress)
  const { address: connectedAddress, isConnected } = useAccount();


  // Automatically use connected wallet unless user overrides
  useEffect(() => {
    if (isConnected && connectedAddress) {
      updateSelectedAddress(connectedAddress);
      console.log("zustand address ", zustand_address);
    }
  }, [isConnected, connectedAddress]);

  return (
    <div className="mx-auto p-6">
      <div className='flex'>
        <div className='flex-1 px-3'>
          <Sidebar />
        </div>
        <div className='flex-3'>
          <DashboardTabs address={zustand_address} />
        </div>
      </div>
    </div>
  );
}

export default App;
