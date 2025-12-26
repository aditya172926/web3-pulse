import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router";
import { formatEther } from 'viem';
import { useOnChainClient, useSelectedAddress } from "../../state";
import AddressInput from "../AddressInput";
import AccountCard from './AccountCard';
import SidebarBalanceCard from './SidebarBalanceCard';
import SidebarTransactionCard from './SidebarTransactionCard';

interface AccountData {
    balance: string,
    blockNumber: string,
    isContract: boolean,
    transactionCount: number
}

export default function Sidebar() {
    const providerClient = useOnChainClient((state) => state.providerClient);
    const address = useSelectedAddress((state) => state.address);
    const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress);
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    const sidebarNavBtns = [
        {
            name: "Transactions",
            navLink: "/"
        },
        {
            name: "Portfolio",
            navLink: "/portfolio"
        }
    ];

    async function getData() {
        try {
            const blockNumber = await providerClient.getBlockNumber();
            const balance = formatEther(await providerClient.getBalance({address: address as `0x${string}`}));
            const isContract = await providerClient.getCode({ address: address as `0x${string}` });
            const transactionCount = await providerClient.getTransactionCount({address: address as `0x${string}`});
            setAccountData(
                {
                    balance: balance.toString(),
                    blockNumber: blockNumber.toString(),
                    isContract: isContract ? true : false,
                    transactionCount
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
        <div className="grid h-full grid-rows-[auto_minmax(0,3fr)_1fr_auto] gap-4">
            {/* Top */}
            <div>
                <AddressInput onSubmit={updateSelectedAddress} />
            </div>

            <div className="overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col flex-wrap gap-2 justify-evenly">
                    <AccountCard address={address} isContract={accountData?.isContract} />
                    <SidebarTransactionCard transactionCount={accountData?.transactionCount} />
                    <SidebarBalanceCard balance={accountData?.balance} blockNumber={accountData?.blockNumber} />
                </div>
            </div>


            <div className="flex flex-col">
                {sidebarNavBtns.map((btn, index) => (
                    <button
                        key={index}
                        className="hover:text-white"
                    >
                        <NavLink key={index} to={btn.navLink} end className={({ isActive }) => isActive ? "text-white" : "text-slate-500" }>
                            {btn.name}
                        </NavLink>
                    </button>
                ))}
            </div>

            <div className="flex justify-center text-slate-400">
                <ConnectButton />
            </div>
        </div >
    )
}

