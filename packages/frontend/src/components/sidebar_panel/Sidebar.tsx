import AddressInput from "../AddressInput";
import { useSelectedAddress } from "../../state";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from "react-router";

export default function Sidebar() {
    const address = useSelectedAddress((state) => state.address);
    const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress);
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

    return (
        <div className="grid h-full grid-rows-[auto_2fr_1fr_auto] gap-4">
            {/* Top */}
            <div>
                <AddressInput onSubmit={updateSelectedAddress} />
            </div>

            <div className="text-sm">
                <p>{address}</p>
            </div>

            <div className="flex flex-col">
                {sidebarNavBtns.map((btn, index) => (
                    <button
                        key={index}
                        className="text-slate-500 hover:text-white"
                    >
                        <NavLink to={btn.navLink} end>
                            {btn.name}
                        </NavLink>
                    </button>
                ))}
            </div>

            <div className="flex justify-center text-slate-400">
                <ConnectButton />
            </div>
        </div>
    )
}

