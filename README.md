# Submission details
- Frontend url (Vercel): https://safe-code-challenge-fullstack-front.vercel.app
- Backend url (Render): https://safe-code-challenge-fullstack.onrender.com

> Note: The backend is hosted on Render. The current free instance spins down with some inactivity. Due to this it might take a minute to come back up. (as noted on the render's website)

#### [Decision making doc is here](./DECISIONS.md)

### Demo

# Ethereum Transaction History Viewer - Take-Home Challenge

Build a transaction history viewer that displays Ethereum transaction history for any given address.

## 🚀 Quick Start

```bash
npm install
npm run dev

```

- **Frontend**: [http://localhost:5173](http://localhost:5173/)
- **Backend**: [http://localhost:3001](http://localhost:3001/)

## 🎯 Your Mission

Build a web application that allows users to enter an Ethereum address and view its transaction history.

### What to Build

Build a web application where users can:

- Enter an Ethereum address
- View transaction history for that address
- See transaction details (hash, timestamp, amounts, etc.)
- Navigate through multiple transactions

### Technical Stack

- **Frontend**: React with TypeScript (provided)
- **Backend**: NestJS (provided)
- **Network**: Ethereum Mainnet only
- **Deployment**: Deploy your solution so we can test it live

**Focus Areas:**

- **Backend Candidates:** We’re interested in understanding your thought process and how you apply best practices in areas like API design - you can choose which approaches you consider best. Production ready.
- **Frontend candidates:** We’re interested in your thought process and how you apply best practices in areas like UI/UX, architecture, etc - you decide which approaches make the most sense. Production ready.
- **Fullstack candidates**: Show integration skills and how you approach the full stack

## 🛠️ Setup

**Backend candidates:**

1. Get API keys (Alchemy or Etherscan) - see links below
2. Configure environment variables for your API keys
3. Start backend: `npm run dev:backend`

**Frontend candidates:**

1. Start frontend: `npm run dev:frontend`
2. If mocking backend, no API keys needed

**Fullstack candidates:**

1. Get API keys and configure environment variables
2. Start both: `npm run dev`

**API Keys:**

- **Alchemy**: https://dashboard.alchemy.com/ (free tier: 300M compute units/month)
- **Etherscan**: https://etherscan.io/myapikey (free tier: 5 calls/second)

## 📋 Implementation Paths

Choose the path that matches your role:

### 🎯 Backend-Focused (Backend candidates)

**Expected Time: 3-4 hours**

Build a backend API that serves transaction data. You don't need to build the frontend.

**What to build:**

- An API endpoint that accepts an Ethereum address and returns transaction history
- Fetch transaction data from blockchain providers (Alchemy, Etherscan, etc.)
- Support pagination

---

### 🎨 Frontend-Focused (Frontend candidates)

**Expected Time: 3-4 hours**

Build a frontend application that displays transaction history. You can mock the backend or call blockchain APIs directly.

**What to build:**

- A UI where users can enter an Ethereum address and view transaction history
- Display transaction information in a clear, usable way
- When clicking the transaction it shows the transaction details

**Options:**

- Call blockchain APIs directly from the frontend

---

### 🔄 Fullstack (Fullstack candidates)

**Expected Time: 5-6 hours**

Build both the backend API and frontend UI.

**What to build:**

- Backend API that serves transaction data
- Frontend UI that consumes the API and displays transactions
- End-to-end functionality working together

**Deploy both** frontend and backend so we can test the complete solution.

## 🧪 Test Addresses

- `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` (Vitalik Buterin)

## 🚀 Production Readiness

Your solution should be **production-ready** - as if we would continue working on this project and release it to users.

**Important:** Feel free to apply production patterns and best practices even if they might seem "overengineered" for a small project. We want to see how you think about:

We're interested in seeing your judgment on when to apply patterns, abstractions, and architectural decisions. If you think a pattern or approach would help with maintainability or future expansion, use it - even if it's more than what's strictly needed for this small project.

**Deploy your solution** so we can test it live:

- **Frontend**: [Vercel](https://vercel.com/), Netlify, or similar
- **Backend**: [Railway](https://railway.app/), [Render](https://render.com/), or similar
- **Fullstack**: Deploy both frontend and backend

Make sure your deployed solution works and is accessible.

You can add a file documenting your decisions, what you would do next, what's missing, and what you would do differently.

## 📝 Submission

1. Create a private fork of this repository
2. Deploy your solution (frontend and/or backend)
3. Share the repository and **deployment URLs** with us
4. Invite @yagopv and @katspaugh as collaborators to your private repo

**Include in your submission:**

- Repository link
- Frontend deployment URL (if applicable)
- Backend deployment URL (if applicable)
- Brief notes on any assumptions or decisions made

## 💡 AI Tools Welcome

Feel free to use AI tools. We're interested in how you review and integrate AI-generated code.
