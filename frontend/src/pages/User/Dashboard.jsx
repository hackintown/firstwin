import React from "react";
import Banner from "../../components/User/Dashboard/Banner";
import NoticeBar from "../../components/User/Dashboard/NoticeBar";
import Lottery from "../../components/Home/Lottery/Lottery";
import Popular from "../../components/Home/Popular/Popular";
import CategoryTab from "../../components/Home/CategoryTab/CategoryTab";
const Dashboard = () => {
  return (
    <div className="flex flex-col py-4 space-y-6">
      <Banner />
      <NoticeBar />
      <CategoryTab />
      <Lottery />
      <Popular />
    </div>
  );
};

export default Dashboard;
