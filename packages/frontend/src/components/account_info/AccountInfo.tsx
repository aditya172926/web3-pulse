import { ReactElement, useEffect, useState } from "react";
import { useOnChainClient, useSelectedAddress } from "../../state";
import DashboardTabs from "../DashboardTabs";
import { formatEther } from "viem";

interface AccountInfoData {
    totalTransactions: number,
    balance: string
}

export default function AccountInfo() {
    const address = useSelectedAddress((state) => state.address);
    const providerClient = useOnChainClient((state) => state.providerClient);
    const [accountInfoData, setAccountInfoData] = useState<AccountInfoData | null>(null);

    async function fetch_account_info() {
        try {
            const totalTransactions = await providerClient.getTransactionCount({address: address as `0x${string}`});
            const balance = formatEther(await providerClient.getBalance({address: address as `0x${string}`}));
            // const totalGasSpent = await providerClient
            setAccountInfoData({
                totalTransactions,
                balance,
            });
        } catch (error) {
            console.log("Error in fetching account info ", error);
        }
    }

    useEffect(() => {
        const fetch = async() => {
            await fetch_account_info();
        }
        fetch();
    }, [address])

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-stone-200">
                <h1 className="text-3xl font-bold text-stone-800 mb-2">Account Overview</h1>
                <p className="text-stone-600 font-mono text-sm break-all">{address}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
                <MetricCard
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                        </svg>
                    }
                    label="Total Transactions"
                    value={accountInfoData?.totalTransactions.toString()}
                    color="blue"
                />
                <MetricCard
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clip-rule="evenodd" />
                        </svg>
                    }
                    label="Balance (ETH)"
                    value={accountInfoData?.balance}
                    color="amber"
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Charts */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Activity Heatmap */}
                    <ContentCard title="Transactions">
                        <DashboardTabs address={address} />
                    </ContentCard>
                </div>

                {/* Right Column - Security & Approvals */}
                {/* <div className="space-y-6">
                    <ContentCard title="Token Approvals">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-700">High Risk</span>
                                </div>
                                <span className="text-lg font-bold text-red-700">3</span>
                            </div>
                            <button className="w-full mt-4 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors font-medium">
                                Manage Approvals
                            </button>
                        </div>
                    </ContentCard>
                </div> */}
            </div>
        </div>
    );
}

interface MetricCardProps {
    icon: ReactElement,
    label: string,
    value?: string,
    color: string
}

function MetricCard({ icon, label, value, color }: MetricCardProps) {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-50 border-blue-200 text-blue-600',
        amber: 'bg-amber-50 border-amber-200 text-amber-600',
        purple: 'bg-purple-50 border-purple-200 text-purple-600'
    };

    return (
        <div className={`${colorClasses[color]} rounded-lg shadow-sm p-5 border`}>
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <span className="text-xs font-medium text-stone-700">{label}</span>
            </div>
            <div className="text-xl font-bold text-stone-800">{value}</div>
        </div>
    );
}

interface ContentCardProps {
    title: string,
    children: ReactElement
}

function ContentCard({ title, children }: ContentCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">{title}</h2>
            {children}
        </div>
    );
}