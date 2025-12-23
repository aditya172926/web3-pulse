import DashboardTabs from "../components/DashboardTabs";
import Sidebar from "../components/sidebar_panel/Sidebar";
import { useSelectedAddress } from "../state";

export default function Transactions() {
    const address = useSelectedAddress((state) => state.address);

    return (
        <div>
            <div className='flex h-screen'>
                <div className='flex-1 p-2 bg-stone-300'>
                    <Sidebar />
                </div>
                <div className='flex-3 px-2 bg-stone-100 overflow-y-auto'>
                    <DashboardTabs address={address} />
                </div>
            </div>
        </div>
    )
}