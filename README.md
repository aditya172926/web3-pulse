# DeFi Portfolio Tracker - Take-Home Challenge

A take-home coding challenge to build a DeFi portfolio tracker with wallet connection and transaction history.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start both backend and frontend
npm run dev
```

- **Frontend**: http://localhost:5173 (React + Vite)
- **Backend**: http://localhost:3001 (NestJS)

## 📁 Project Structure

```
├── packages/
│   ├── backend/          # NestJS API server
│   └── frontend/         # React + Vite app
└── README.md             # Project setup documentation
```

## ⚡ What's Included

This template provides:

- ✅ Monorepo setup with workspaces
- ✅ NestJS backend with TypeScript
- ✅ React frontend with Vite and TypeScript
- ✅ Basic testing setup (Jest + Vitest)
- ✅ Development environment ready to go

## 🎯 Your Mission

Build a DeFi portfolio tracker that:

### Core Features

- **Wallet Connection:** Connect with MetaMask
- **Display connected address information**:  
  After the successful connection or after changing the connected Metamask account, the app should display the following.
  - **Token Balances:** Display ERC-20 token balances with USD values and token information (symbol, name, balance)
  - **Transaction History:** Show recent transactions (ERC-20 transfers, ETH transfers)
  - **Portfolio Value:** Calculate and display total portfolio value in USD

### Technical Requirements

- **Frontend**: React with TypeScript, Ethereum Mainnet. If applying to **FullStack with Frontend expertise** we expect the main focus to be in this section.
- **Backend**: NestJS API proxy that aggregates blockchain data. Database is not required, can use in-memory caching if needed. If applying to **FullStack with Backend expertise** we expect the main focus to be in this section.

### Optional 

We provide the template setup with React and NestJS, but you are free to modify to any other tool you may prefer.

We appreciate **creativity** and encourage you to add your own touch.

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start both services
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only

# Testing
npm run test            # Run all tests
npm run test:frontend   # Frontend tests only
npm run test:backend    # Backend tests only

# Building
npm run build           # Build both projects
```

## 🛠️ Environment Setup

The template includes `.env.example` files for both frontend and backend. Copy them to `.env` files and add your API keys:

- **Recommended**: Alchemy, Etherscan, CoinGecko
- **Alternatives**: Moralis, CovalentHQ, Infura

## 📚 Implementation Notes

### Architecture Decisions Are Yours

- How to structure your components and services
- Which blockchain APIs to integrate with
- How to manage wallet state
- Error handling strategy
- UI/UX approach

## 🤔 Need Blockchain APIs?

Common providers for Ethereum data:

- **Alchemy** - Reliable, good free tier
- **Etherscan** - Great for transaction history
- **CoinGecko** - Token prices and market data

## 💡 AI Tools Welcome

Feel free to use AI tools. We're interested in how you review, customize, and integrate AI-generated code.

## How to provide your solution

Please create a private fork of this repo at your own Github.
Share it with us once you complete the challenge. Please invite @yagopv and @katspaugh as collaborators to your private repo.
