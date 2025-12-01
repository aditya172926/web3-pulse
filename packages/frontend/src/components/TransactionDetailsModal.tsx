import { Transaction, TransactionReceiptResult } from "../interfaces";

export function TransactionDetailsModal({
    open,
    onClose,
    receipt,
}: {
    open: boolean;
    onClose: () => void;
    txn_data: Transaction | null,
    receipt: TransactionReceiptResult | null;
}) {
    return (
        <div
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            onClick={onClose}
        >
            <div
                className={`absolute right-0 top-0 h-full w-[50vw] max-w-[700px]  bg-white shadow-lg p-6 transition-transform ${open ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>

                {!receipt ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Hash:</strong> {receipt.transactionHash}</p>
                        <p><strong>Status:</strong> {receipt.status === "0x1" ? "Success" : "Failed"}</p>
                        <p><strong>Block:</strong> {parseInt(receipt.blockNumber, 16)}</p>
                        <p><strong>From:</strong> {receipt.from}</p>
                        <p><strong>To:</strong> {receipt.to}</p>
                        <p><strong>Gas Used:</strong> {parseInt(receipt.gasUsed, 16)}</p>
                        <p><strong>Gas Price:</strong> {parseInt(receipt.effectiveGasPrice, 16)} wei</p>
                        <p><strong>Cumulative Gas Used:</strong> {parseInt(receipt.cumulativeGasUsed, 16)}</p>
                    </div>
                )}

                <button
                    className="mt-6 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
