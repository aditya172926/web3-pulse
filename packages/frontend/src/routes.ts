import { createBrowserRouter } from "react-router";
import App from "./App";
import AccountInfo from "./components/account_info/AccountInfo";
import PortfolioGrid from "./components/PortfolioGrid";
import Transactions from "./pages/Transactions";
import { getTransactionReceipt } from "./services/transactions";
import { TransactionReceiptResult } from "./interfaces";
import TransactionDetailsPage from "./components/TransactionDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                Component: Transactions,
                children: [
                    { index: true, Component: AccountInfo },
                    { path: "portfolio", Component: PortfolioGrid },
                    {
                        path: "transaction/:transaction_hash",
                        loader: async ({params}) => {
                            const transaction_hash = params.transaction_hash;
                            if (!transaction_hash)
                                return null;
                            const txn_receipt: TransactionReceiptResult = await getTransactionReceipt(transaction_hash);
                            return {receipt: txn_receipt};
                        },
                        Component: TransactionDetailsPage
                    }
                ]
            }
        ]
    }
])