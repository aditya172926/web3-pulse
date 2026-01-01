import { createBrowserRouter } from "react-router";
import App from "./App";
import AccountInfo from "./components/account_info/AccountInfo";
import PortfolioGrid from "./components/PortfolioGrid";
import Transactions from "./pages/Transactions";

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
                    { path: "accountInfo", Component: AccountInfo }
                ]
            }
        ]
    }
])