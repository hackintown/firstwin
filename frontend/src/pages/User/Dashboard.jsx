import React from "react";
import Banner from "../../components/User/Dashboard/Banner";
const Dashboard = () => {
  return (
    <div className="flex flex-col py-4">
      <Banner />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
        <div className="h-10 w-10 rounded-full bg-gray-200">
          {/* User avatar placeholder */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Quick Stats */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Quick Stats</h2>
          {/* Add stats content */}
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Recent Activity</h2>
          {/* Add activity content */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
