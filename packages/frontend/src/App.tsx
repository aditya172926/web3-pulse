import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState<string>("Checking...");

  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch("http://localhost:3001/about");
        const data = await response.json();
        setBackendStatus(`✅ Backend connected: ${data.message}`);
      } catch (error) {
        setBackendStatus("❌ Backend not connected");
      }
    };

    testBackend();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔗 DeFi Portfolio Tracker</h1>
        <p>Take-Home Challenge Template</p>

        <div className="status-card">
          <p>{backendStatus}</p>
        </div>

        <div className="info-card">
          <h2>🚀 Ready to Build!</h2>
          <p>This template provides:</p>
          <ul>
            <li>✅ NestJS backend running on port 3001</li>
            <li>✅ React + Vite frontend running on port 5173</li>
            <li>✅ TypeScript configuration</li>
            <li>✅ Basic testing setup</li>
          </ul>
          <p>Now it's your turn to implement the DeFi portfolio tracker!</p>
        </div>

        <div className="requirements-card">
          <h2>📋 What to Build</h2>
          <div className="requirements">
            <div className="requirement-section">
              <h3>Frontend Requirements:</h3>
              <ul>
                <li>MetaMask wallet connection</li>
                <li>Display token balances with USD values</li>
                <li>Show transaction history</li>
                <li>Calculate total portfolio value</li>
                <li>Handle errors gracefully</li>
              </ul>
            </div>

            <div className="requirement-section">
              <h3>Backend Requirements:</h3>
              <ul>
                <li>API endpoints for wallet data</li>
                <li>Integration with blockchain APIs</li>
                <li>Data aggregation and formatting</li>
                <li>Proper error handling</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="get-started-card">
          <h2>🏁 Get Started</h2>
          <p>
            1. Check the task requirements in <code>CODE-CHALLENGE.md</code>
          </p>
          <p>
            2. Read the <code>README.md</code> for setup details
          </p>
          <p>3. Start implementing!</p>
        </div>
      </header>
    </div>
  );
}

export default App;
