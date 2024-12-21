import React from "react";
import Banner from "../../components/User/Dashboard/Banner";
import NoticeBar from "../../components/User/Dashboard/NoticeBar";
import Lottery from "../../components/Home/Lottery/Lottery";
import Popular from "../../components/Home/Popular/Popular";
import CategoryTab from "../../components/Home/CategoryTab/CategoryTab";
import WinningInfo from "../../components/Home/WinningInfo/WinningInfo";
import TodaysEarningChart from "../../components/Home/TodaysEarningChart/TodaysEarningChart";
const Dashboard = () => {
  return (
    <div className="flex flex-col py-4 space-y-6">
      <Banner />
      <NoticeBar />
      <CategoryTab />
      <Lottery />
      <Popular />
      <WinningInfo />
      <TodaysEarningChart />
    </div>
  );
};

export default Dashboard;
