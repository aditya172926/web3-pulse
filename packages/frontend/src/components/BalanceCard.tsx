import { copyToClipboard, format_slice } from "../helper";
import { Icon } from "../icons";
import { BalanceInfo } from "../services/portfolio"

interface Props {
    balanceData: BalanceInfo
}

export default function BalanceCard({ balanceData }: Props) {
    const currentPrice = balanceData.tokenPrices.find((tokenPrice) => {
        if (tokenPrice.currency.toLowerCase() === "usd") {
            return tokenPrice;
        }
    })
    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-2">
            {/* Single Row Layout */}
            <div className="flex items-center gap-4">
                {/* Token Logo & Symbol */}
                <div className="flex items-center gap-3 min-w-[140px]">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-gray-200 overflow-hidden">
                            {balanceData.tokenMetadata.logo ? (
                                <img
                                    src={balanceData.tokenMetadata.logo}
                                    alt={balanceData.tokenMetadata.symbol || 'Token'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        if (e.currentTarget.parentElement) {
                                            e.currentTarget.parentElement.innerHTML = `<span class="text-base font-bold text-blue-600">${balanceData.tokenMetadata.symbol?.[0] || 'T'}</span>`;
                                        }
                                    }}
                                />
                            ) : (
                                <span className="text-base font-bold text-blue-600">
                                    {balanceData.tokenMetadata.symbol?.[0] || 'T'}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-base" title={balanceData.tokenMetadata.symbol || 'Unknown'}>
                            {format_slice(balanceData.tokenMetadata.symbol || 'Unknown')}
                        </h3>
                        <p className="text-xs text-gray-500" title={balanceData.tokenMetadata.name || 'Unknown'}>
                            {format_slice(balanceData.tokenMetadata.name || 'Unknown Token', 20)}
                        </p>
                    </div>
                </div>

                {/* Token Address */}
                <div className="flex-1 min-w-[120px]">
                    <p className="text-xs text-gray-500 mb-1">Token Contract</p>
                    <div className="flex items-center gap-1">
                        <p className="font-mono text-sm text-gray-700">
                            {format_slice(balanceData.tokenAddress)}
                        </p>
                        <button
                            onClick={() => copyToClipboard(balanceData.tokenAddress)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copy address"
                        >
                            <Icon name="copyToClipboard" className="size-4 cursor-pointer" />
                        </button>
                    </div>
                </div>

                {/* Balance */}
                <div className="text-right min-w-[110px]" title={balanceData.formattedTokenBalance || '0.00'}>
                    <p className="text-xs text-gray-500 mb-1">Balance</p>
                    <p className="font-semibold text-gray-900">
                        {format_slice(balanceData.formattedTokenBalance || '0.00')}
                    </p>
                </div>

                {/* Price */}

                <div className="text-right min-w-[100px]">
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="font-semibold text-gray-900 text-sm">
                        ${currentPrice ? parseFloat(currentPrice.value).toFixed(4) : "--"}
                    </p>
                </div>


                {/* USD Value */}
                <div className="text-right min-w-[110px]">
                    <p className="text-xs text-gray-500 mb-1">Value</p>
                    <p className="font-bold text-green-600 text-base">
                        ${parseFloat(balanceData.balanceUsd || '0.00').toFixed(4)}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <a
                        href={`https://etherscan.io/token/${balanceData.tokenAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View on Etherscan"
                    >
                        <Icon name="arrowDiagonalOut" className="size-4 cursor-pointer" />
                    </a>
                </div>
            </div>
        </div>
    );
}