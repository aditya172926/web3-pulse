import { useEffect } from 'react';
import DashboardTabs from './components/DashboardTabs';
import '@rainbow-me/rainbowkit/styles.css';


import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSelectedAddress } from './state';
import Sidebar from './components/Sidebar';


function App() {
  const address = useSelectedAddress((state) => state.address);
  const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress)
  const { address: connectedAddress, isConnected } = useAccount();


  // Automatically use connected wallet unless user overrides
  useEffect(() => {
    if (isConnected && connectedAddress) {
      updateSelectedAddress(connectedAddress);
    }
  }, [isConnected, connectedAddress]);

  return (
    <div>
      <div className='flex'>
        <div className='flex-1 p-2 bg-slate-900 text-white'>
          <Sidebar />
        </div>
        <div className='flex-3 px-2 bg-slate-50'>
          <DashboardTabs address={address} />
        </div>
      </div>
    </div>
  );
}

export default App;
