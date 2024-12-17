import { useState } from "react";
import { FaWallet, FaBell, FaHeadset } from "react-icons/fa";

export default function Navigation() {
  const [balance, setBalance] = useState("₹0.00");

  return (
    <nav className="fixed top-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-background border-b border-border z-50">
      <div className="relative">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground font-serif">
              First <span className="text-primary">Win</span>
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Customer Service */}
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <FaHeadset className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <FaBell className="h-5 w-5" />
            </button>

            {/* Balance */}
            <div className="flex items-center gap-x-4 px-3 py-1.5 rounded-full bg-card/30 border border-border/30">
              <FaWallet className="text-primary h-5 w-5" />
              <div className="flex flex-col">
                <p className="text-xs text-foreground">Balance</p>
                <span className="text-xs font-light text-primary">
                  {balance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
