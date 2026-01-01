import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { useOnChainClient, useSelectedAddress } from "../../state";
import AddressInput from "../AddressInput";
import AccountCard from './AccountCard';
import ChainCard from './ChainCard';
import SidebarBalanceCard from './SidebarBalanceCard';

interface AccountData {
    balance: string,
    blockNumber: string,
    isContract: boolean,
    chainId: number,
    gasPrice: string
}

export default function Sidebar() {
    const providerClient = useOnChainClient((state) => state.providerClient);
    const address = useSelectedAddress((state) => state.address);
    const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress);
    const [accountData, setAccountData] = useState<AccountData | null>(null);

    async function getData() {
        try {
            const blockNumber = await providerClient.getBlockNumber();
            const balance = formatEther(await providerClient.getBalance({address: address as `0x${string}`}));
            const isContract = await providerClient.getCode({ address: address as `0x${string}` });
            const chainId = await providerClient.getChainId();
            const gasPrice = formatEther(await providerClient.getGasPrice());
            setAccountData(
                {
                    balance: balance.toString(),
                    blockNumber: blockNumber.toString(),
                    isContract: isContract ? true : false,
                    chainId,
                    gasPrice
                }
            )
        } catch (error) {
            console.log("Error in fetching block number ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => await getData();
        fetchData();
    }, [address]);

    return (
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
            {/* Top */}
            <div>
                <AddressInput onSubmit={updateSelectedAddress} />
            </div>

            <div className="overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col flex-wrap gap-2 justify-evenly">
                    <AccountCard address={address} isContract={accountData?.isContract} />
                    <SidebarBalanceCard balance={accountData?.balance} blockNumber={accountData?.blockNumber} />
                    <ChainCard chainId={accountData?.chainId} gasPrice={accountData?.gasPrice} />
                </div>
            </div>

            <div className="flex justify-center text-slate-400">
                <ConnectButton />
            </div>
        </div >
    )
}

