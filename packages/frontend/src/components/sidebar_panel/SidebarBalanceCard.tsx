import { format_slice } from "../../helper"

interface BalanceProps {
    balance?: string,
    blockNumber?: string
}

export default function SidebarBalanceCard({balance, blockNumber}: BalanceProps) {
    return (
        <div className="text-sm flex-1 rounded-xl p-4 border border-slate-700 cursor-pointer hover:bg-stone-400 transition">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clip-rule="evenodd" />
                        </svg>

                        <h3>Balance</h3>
                    </div>
                    <div className="space-y-2" title={balance}>
                        <div className="flex item-baseline gap-2">
                            <span className="text-sm font-bold text-white truncate flex-1 min-w-0">
                                {format_slice(balance!)}
                            </span>
                            <span className="text-sm text-slate-600">ETH</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <span className="text-sm text-slate-600">
                                Block
                            </span>
                            <span className="text-sm">
                                {blockNumber}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}