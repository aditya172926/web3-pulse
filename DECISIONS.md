# 🚀 DeFi Portfolio Tracker — Architecture & Design Decisions

This project is a **full-stack Ethereum portfolio dashboard** built using:

* **Backend:** NestJS
* **Frontend:** React + Vite + RainbowKit + Wagmi
* **Blockchain Data Provider:** Alchemy api
* **Testing:** Jest
* **CI/CD:** GitHub Actions
* **Rate Limiting:** Nest Throttler
* **Hosting Solutions:** Vercel, Render

The app allows users to:

* Connect MetaMask
* View transaction history (inbound/outbound)
* View token balances
* Search for any Ethereum address
* Get proper UI feedback for errors

---

## Project Thought process and approach

### Keeping simplicity first
The frontend and backend workspaces are modified and structured way to keep things simple, easy to understand and to avoid unnecessary dependency bloating.

### Scalable
We should be able to easily support new chains, expand modules and include other api support.
These are highlighted in what I would do next section.

### Validation
The inputs are validated through custom nest pipes and enforces a consistent error responses from the apis if it fails.

There are 2 custom validation pipes built in the backend.
- Evmaddress Pipe: To validate an evm address and normalize it to lowercase
- Transaction hash pipe: To validate a transaction hash string and normalize it to lowercase

## Backend

### Architecture
I created different modules to fetch Balances and historical transaction for an address. With this we have separation in controllers, routes, easy in testing and other modules or features can be added in a similar way.

Pipes prevent the controllers to send a request to alchemy on invalid EVM address or transaction hash.
The approach for implementing the validation of these in pipe is done using a regex which checks for the pattern of an EVM address and a valid transaction hash.

There are other ways to do this validation too, like using external packages like ethers.js and viem, but I wanted to avoid bloating dependencies and keep things simple if it does the job.

These packages can be included when I implement features that require more checks on the address like Checksum validtion.

### Alchemy
I used alchemy for fetching token balances and transaction history for the user. I chose the tab based UI design to separate the rpc calls to the url and better visualization.

These are the rpc methods that I used:
- eth_getTransactionReceipt: to get transaction receipt
- alchemy_getTokenBalances: get all token balances for an address
- alchemy_getAssetTransfers: get transaction history for an address

### Caching
The backend does an in-memory caching of transaction details and user balance.
The cache keys uses scoped prefixes to prevent them from overwriting each other.

Benefits of doing this for receipts and balances
- faster responses for repeated views
- lower hits to alchemy api
- needed when facing high traffic

### Rate limiting
The backend apis implements the nest throttling rate limite with a global guard to prevent attacks and exhausting api computes from alchemy.

## Frontend
### Wallet connection

I used rainbow + wagmi for implementing wallet connection in the UI.
Users can use the search without connecting their wallets as well. But the website will auto fetch the users' historical transactions as soon as they connect their wallet.

### Tabs
There are 3 tabs currently
* Inbound
* Outbound
* Portfolio

Having tabs makes expansion easier and also helps being strategic about fetching data form the backend and just gives more control over when we want to hit an api to re-fetch the data.

## CI/CD — GitHub Actions

CI pipeline runs on:

* Every branch
* Every pull request

Pipeline includes:

1. Install dependencies
3. Run backend & frontend builds
4. Run tests

## What's next?
These are the following point on frontend and backend that I would like to do next.
- add redis for cache instead of in-memory
- modals for token metadata, usd values, better UI onClick a portfolio token
- multi chain support
- non-evm support in a better visualization
- group different related transactions together (external, internal, etc)
- dockerize the workspaces
- development to production rolling deployments with CI