import { BalanceData } from "../services/portfolio"

interface Props {
    balanceData: BalanceData
}

export default function BalanceCard({ balanceData }: Props) {
    return (
        <div
            className="grid grid-cols-2 gap-4 py-3 pl-1 cursor-pointer hover:shadow-md transition"
        >
            <div className="text-sm text-gray-600">
                {balanceData.token_contract_address}
            </div>
            <div className="text-sm text-gray-600">
                {balanceData.balance}
            </div>
        </div>
    )
}