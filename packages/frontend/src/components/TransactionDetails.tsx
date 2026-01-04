import { useLoaderData, useNavigate } from "react-router";
import { Icon } from "../icons";
import { TransactionReceiptResult } from "../interfaces";
import { useSelectedTransaction } from "../state";

type Props = {
    receipt: TransactionReceiptResult
}

export default function TransactionDetailsPage() {
    const txn_data = useSelectedTransaction((state) => state.transaction);
    const setSelectedTransaction = useSelectedTransaction((state) => state.setTransaction);
    const { receipt } = useLoaderData<Props>();
    const navigate = useNavigate();

    function onBack() {
        navigate(-1);
        setSelectedTransaction(null);
    }

    if (!txn_data) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        {/* <ArrowLeft className="w-5 h-5" /> */}
                        <Icon name="arrowLeft" />
                        <span className="font-medium">Back</span>
                    </button>
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <p className="text-gray-500">No transaction data available</p>
                    </div>
                </div>
            </div>
        );
    }

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleString();
    };

    const hexToDecimal = (hex: string) => {
        return parseInt(hex, 16).toLocaleString();
    };

    const formatValue = (value: string) => {
        const ethValue = parseInt(value) / 1e18;
        return ethValue.toFixed(6);
    };

    const isSuccess = receipt?.status === '0x1';

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
                >
                    {/* <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> */}
                    <Icon name="arrowLeft" />
                    <span className="font-medium">Back to Transactions</span>
                </button>

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        {/* <FileText className="w-8 h-8 text-blue-600" /> */}
                        <Icon name="documentCheck" />
                        <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
                    </div>
                    <p className="text-gray-600">View complete information about this blockchain transaction</p>
                </div>

                <div className="space-y-6">
                    {/* Status Banner */}
                    {receipt && (
                        <div className={`p-6 rounded-xl flex items-center gap-4 shadow-sm ${isSuccess
                                ? 'bg-green-50 border-2 border-green-200'
                                : 'bg-red-50 border-2 border-red-200'
                            }`}>
                            {isSuccess ? (
                                // <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                                <Icon name="checkIcon" />
                            ) : (
                                // <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                                <Icon name="crossIcon" />
                            )}
                            <div>
                                <p className={`text-lg font-bold ${isSuccess ? 'text-green-900' : 'text-red-900'}`}>
                                    {isSuccess ? 'Transaction Successful' : 'Transaction Failed'}
                                </p>
                                <p className={`text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                                    Status Code: {receipt.status}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Transaction Overview */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            {/* <ArrowRight className="w-6 h-6 text-blue-600" /> */}
                            <Icon name="arrowRight" />
                            Transaction Overview
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-2">Category</label>
                                    <span className="inline-flex px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">
                                        {txn_data.category}
                                    </span>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-2">Asset</label>
                                    <p className="font-mono text-base font-medium text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                                        {txn_data.asset}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-2">Value</label>
                                    <p className="font-mono text-2xl font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                                        {formatValue(txn_data.value)} ETH
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-2 flex items-center gap-1">
                                        {/* <Clock className="w-4 h-4" /> */}
                                        <Icon name="clockIcon" />
                                        Timestamp
                                    </label>
                                    <p className="text-base font-medium text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                                        {formatTimestamp(txn_data.block_timestamp)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Addresses</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-2 block">From Address</label>
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                    <span className="font-mono text-sm flex-1 text-gray-900">{txn_data.from}</span>
                                    <button
                                        onClick={() => copyToClipboard(txn_data.from)}
                                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors group"
                                        title="Copy address"
                                    >
                                        {/* <Copy className="w-4 h-4 text-gray-600 group-hover:text-gray-900" /> */}
                                        <Icon name="copyToClipboard" className="size-6 hover:text-gray-900" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-2 block">To Address</label>
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                    <span className="font-mono text-sm flex-1 text-gray-900">{txn_data.to}</span>
                                    <button
                                        onClick={() => copyToClipboard(txn_data.to)}
                                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors group"
                                        title="Copy address"
                                    >
                                        {/* <Copy className="w-4 h-4 text-gray-600 group-hover:text-gray-900" /> */}
                                        <Icon name="copyToClipboard" className="size-6 hover:text-gray-900" />
                                    </button>
                                </div>
                            </div>
                            {receipt?.contractAddress && (
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">Contract Address</label>
                                    <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg border border-purple-200 hover:border-purple-300 transition-colors">
                                        <span className="font-mono text-sm flex-1 text-gray-900">{receipt.contractAddress}</span>
                                        <button
                                            onClick={() => copyToClipboard(receipt.contractAddress!)}
                                            className="p-2 hover:bg-purple-200 rounded-lg transition-colors group"
                                            title="Copy address"
                                        >
                                            {/* <Copy className="w-4 h-4 text-purple-600 group-hover:text-purple-900" /> */}
                                            <Icon name="copyToClipboard" className="size-6 hover:text-gray-900" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transaction Hash & Block Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                {/* <Hash className="w-5 h-5 text-gray-600" /> */}
                                <Icon name="hashTag" />
                                Transaction Hash
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="font-mono text-xs break-all text-gray-700 leading-relaxed">
                                    {txn_data.transaction_hash}
                                </p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(txn_data.transaction_hash)}
                                className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {/* <Copy className="w-4 h-4" /> */}
                                <Icon name="copyToClipboard" className="size-6 hover:text-gray-900" />
                                Copy Hash
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                {/* <Blocks className="w-5 h-5 text-gray-600" /> */}
                                <Icon name="cube" />
                                Block Information
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600">Block Number</span>
                                    <span className="font-mono text-base font-bold text-gray-900">
                                        {hexToDecimal(txn_data.block_number)}
                                    </span>
                                </div>
                                {receipt && (
                                    <>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm font-medium text-gray-600">Transaction Index</span>
                                            <span className="font-mono text-base font-bold text-gray-900">
                                                {hexToDecimal(receipt.transactionIndex)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm font-medium text-gray-600">Type</span>
                                            <span className="font-mono text-base font-bold text-gray-900">
                                                {receipt.type}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Gas Information */}
                    {receipt && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                {/* <Fuel className="w-6 h-6 text-amber-600" /> */}
                                <Icon name="fire" />
                                Gas Information
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">Gas Used</label>
                                    <p className="font-mono text-2xl font-bold text-gray-900">
                                        {hexToDecimal(receipt.gasUsed)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Units</p>
                                </div>
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">Cumulative Gas</label>
                                    <p className="font-mono text-2xl font-bold text-gray-900">
                                        {hexToDecimal(receipt.cumulativeGasUsed)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Total in block</p>
                                </div>
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block flex items-center gap-1">
                                        {/* <Zap className="w-4 h-4" /> */}
                                        <Icon name="trendUp" />
                                        Gas Price
                                    </label>
                                    <p className="font-mono text-2xl font-bold text-gray-900">
                                        {(parseInt(receipt.effectiveGasPrice, 16) / 1e9).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Gwei</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Token Information */}
                    {(txn_data.erc721_token_id || txn_data.erc1155_metadata || txn_data.token_id) && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Token Information</h2>
                            <div className="space-y-4">
                                {txn_data.token_id && (
                                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <span className="text-sm font-medium text-gray-600">Token ID</span>
                                        <span className="font-mono text-base font-bold text-gray-900">{txn_data.token_id}</span>
                                    </div>
                                )}
                                {txn_data.erc721_token_id && (
                                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <span className="text-sm font-medium text-gray-600">ERC-721 Token ID</span>
                                        <span className="font-mono text-base font-bold text-gray-900">{txn_data.erc721_token_id}</span>
                                    </div>
                                )}
                                {txn_data.erc1155_metadata && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-2">ERC-1155 Metadata</label>
                                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                            <p className="font-mono text-xs break-all text-gray-700 leading-relaxed">
                                                {txn_data.erc1155_metadata}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Block Hash */}
                    {receipt?.blockHash && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Block Hash</h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="font-mono text-xs break-all text-gray-700 leading-relaxed">
                                    {receipt.blockHash}
                                </p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(receipt.blockHash)}
                                className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {/* <Copy className="w-4 h-4" /> */}
                                <Icon name="copyToClipboard" className="size-6 hover:text-gray-900" />
                                Copy Hash
                            </button>
                        </div>
                    )}

                    {/* Event Logs */}
                    {receipt && receipt.logs.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Event Logs</h2>
                            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-3">
                                    {/* <FileText className="w-5 h-5 text-blue-600" /> */}
                                    <Icon name="documentCheck" />
                                    <p className="text-base text-gray-700">
                                        <span className="font-bold text-gray-900">{receipt.logs.length}</span> event log{receipt.logs.length !== 1 ? 's' : ''} recorded for this transaction
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}