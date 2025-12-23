import PortfolioGrid from "../components/PortfolioGrid";
import Sidebar from "../components/sidebar_panel/Sidebar";
import { useSelectedAddress } from "../state";

export default function Portfolio() {
    const address = useSelectedAddress((state) => state.address);
    return (
        <div>
            <div className='flex h-screen'>
                <div className='flex-1 p-2 bg-slate-900 text-white'>
                    <Sidebar />
                </div>
                <div className='flex-3 px-2 bg-slate-50 overflow-y-auto'>
                    <PortfolioGrid address={address} />
                </div>
            </div>
        </div>
    )
}