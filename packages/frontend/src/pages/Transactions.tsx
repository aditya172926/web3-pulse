import { Outlet } from "react-router";
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
                    <Outlet context={{address}} />
                </div>
            </div>
        </div>
    )
}