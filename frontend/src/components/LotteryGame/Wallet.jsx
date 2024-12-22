import React from "react";
import { FaWallet, FaSync } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";

const Wallet = () => {
  return (
    <div className="w-full bg-notice p-4 rounded-xl">
      <div className="w-full">
        <div className="flex justify-center gap-x-10 items-center mb-2">
          <span className="text-2xl font-medium text-foreground relative">
            ₹0.00
            <button className="text-muted-foreground hover:text-accent transition-colors absolute -right-12 top-1">
              <HiOutlineRefresh className="w-6 h-6" />
            </button>
          </span>
        </div>
        <div className="flex items-center justify-center gap-x-2 mb-4">
          <FaWallet className="text-blue-400 w-5 h-5" />
          <span className="text-muted-foreground">Wallet balance</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-secondary hover:bg-destructive text-secondary-foreground py-2 px-6 rounded-3xl font-medium transition-colors">
            Withdraw
          </button>
          <button className="bg-primary hover:bg-success text-primary-foreground py-2 px-6 rounded-3xl font-medium transition-colors">
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
