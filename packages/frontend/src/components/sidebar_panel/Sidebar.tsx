import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router";
import { formatEther } from 'viem';
import { useOnChainClient, useSelectedAddress } from "../../state";
import AddressInput from "../AddressInput";
import AccountCard from './AccountCard';
import SidebarBalanceCard from './SidebarBalanceCard';

export default function Sidebar() {
    const providerClient = useOnChainClient((state) => state.providerClient);
    const address = useSelectedAddress((state) => state.address);
    const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress);
    const [accountData, setAccountData] = useState(null);
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
            const balance = formatEther(await providerClient.getBalance({address}));
            const isContract = await providerClient.getCode({ address: address });
            console.log("is contract ", isContract);
            setAccountData(
                {
                    balance: balance.toString(),
                    blockNumber: blockNumber.toString(),
                    isContract: isContract ? true : false
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
                <div className="flex flex-row flex-wrap gap-2 justify-evenly">
                    <AccountCard address={address} />
                    <SidebarBalanceCard balance={accountData?.balance} blockNumber={accountData?.blockNumber} />
                </div>
            </div>


            <div className="flex flex-col">
                {sidebarNavBtns.map((btn, index) => (
                    <button
                        key={index}
                        className="text-slate-500 hover:text-white"
                    >
                        <NavLink key={index} to={btn.navLink} end className={({ isActive }) => isActive && "text-white"}>
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

