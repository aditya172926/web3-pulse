import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from "react-router";
import { useOnChainClient, useSelectedAddress } from "../../state";
import AddressInput from "../AddressInput";
import { useEffect, useState } from 'react';
import { format_slice } from '../../helper';
import { formatEther } from 'viem';

interface AccountProps {
    address: string
}

function AccountCard({ address }: AccountProps) {
    return (
        <div className="text-sm flex-1 rounded-xl p-4 border border-slate-700 max-w-1/2 hover:bg-stone-400 transition">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                        </svg>
                        <h3>Account</h3>
                    </div>
                    <div>
                        <span className="text-white bg-slate-700 px-2 py-1 rounded">
                            {format_slice(address)}
                        </span>
                    </div>
                    <div className='bg-green-500 text-green-300 px-2 py-1 mt-2 rounded-full'>
                        EOA (Wallet)
                    </div>
                </div>
            </div>
        </div>
    )
}

interface BalanceProps {
    balance: string,
    blockNumber: string
}

function BalanceCard({balance, blockNumber}: BalanceProps) {
    return (
        <div className="text-sm flex-1 rounded-xl p-4 border border-slate-700 max-w-1/2 hover:bg-stone-400 transition">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clip-rule="evenodd" />
                        </svg>

                        <h3>Balance</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex item-baseline gap-2">
                            <span className="text-2xl font-bold text-white truncate flex-1 min-w-0">
                                {balance}
                            </span>
                            <span className="text-sm text-slate-400">ETH</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
                    <BalanceCard balance={accountData?.balance} blockNumber={accountData?.blockNumber} />
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

