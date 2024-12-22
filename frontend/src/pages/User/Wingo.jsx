import React, { useState } from "react";
import Wallet from "../../components/LotteryGame/Wallet";
import NoticeBar from "../../components/User/Dashboard/NoticeBar";
import WingoList from "../../components/LotteryGame/WingoList";
import TimerCard from "../../components/LotteryGame/TimerCard/TimerCard";
import GameSelector from "../../components/LotteryGame/GameSelector/GameSelector";
import TableChart from "../../components/LotteryGame/TableChart/TableChart";

const Wingo = () => {
  const [selectedTime, setSelectedTime] = useState(30);

  const handleTabChange = (time) => {
    setSelectedTime(time);
  };
  return (
    <div className="w-full space-y-4">
      <Wallet />
      <NoticeBar />
      <WingoList onTabChange={handleTabChange} />
      <TimerCard initialTime={selectedTime} />
      <GameSelector />
      <TableChart />
    </div>
  );
};

export default Wingo;
