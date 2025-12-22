import AddressInput from "../AddressInput";
import { useSelectedAddress } from "../../state";
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Sidebar() {
    const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress);
    const sidebarNavBtns = [
        {
            name: "Transactions",
        },
        {
            name: "Portfolio"
        }
    ];

    return (
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
            {/* Top */}
            <div>
                <AddressInput onSubmit={updateSelectedAddress} />
            </div>

            {/* Middle (fills remaining space) */}
            <div className="flex flex-col">
                {sidebarNavBtns.map((btn, index) => (
                    <button
                        key={index}
                        className="text-slate-500 hover:text-white"
                    >
                        {btn.name}
                    </button>
                ))}
            </div>

            {/* Bottom (span 1 row) */}
            <div className="flex justify-center text-slate-400">
                <ConnectButton />
            </div>
        </div>

    )
}

