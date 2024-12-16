import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
        <div className="bg-[#1A1C2C] rounded-xl p-6 shadow-xl">
          <h2 className="text-xl text-white mb-4">
            Welcome, {user?.name || "User"}!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add your dashboard content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
