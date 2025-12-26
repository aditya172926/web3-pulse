interface TransactionCardProps {
    transactionCount?: number
}

export default function SidebarTransactionCard({ transactionCount }: TransactionCardProps) {
    return (
        <div className="text-sm flex-1 rounded-xl p-4 border border-slate-700 cursor-pointer hover:bg-stone-400 transition">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                        <h3>Txn. Count</h3>
                    </div>
                    <div className="text-center">
                        <span className="text-white px-2 py-1" style={{
                            fontSize: `${Math.max(1, 3 - (transactionCount?.toString().length ?? 0) * 0.15)}rem`
                        }}>
                            {transactionCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}