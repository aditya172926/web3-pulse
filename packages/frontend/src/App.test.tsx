import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

// Mock fetch for testing
global.fetch = vi.fn();

describe("App", () => {
  it("renders the main heading", () => {
    // Mock successful backend response
    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ message: "Backend is running" }),
    });

    render(<App />);

    expect(screen.getByText("🔗 DeFi Portfolio Tracker")).toBeInTheDocument();
  });
});
