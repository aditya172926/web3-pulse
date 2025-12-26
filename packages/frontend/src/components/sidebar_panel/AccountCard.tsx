import { format_slice } from "../../helper"

interface AccountProps {
    address: string
}

export default function AccountCard({ address }: AccountProps) {
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