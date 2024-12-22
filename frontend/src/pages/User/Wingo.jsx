import React from "react";
import Wallet from "../../components/LotteryGame/Wallet";
import NoticeBar from "../../components/User/Dashboard/NoticeBar";
import WingoList from "../../components/LotteryGame/WingoList";
import TimerCard from "../../components/LotteryGame/TimerCard/TimerCard";
import GameSelector from "../../components/LotteryGame/GameSelector/GameSelector";
import TableChart from "../../components/LotteryGame/TableChart/TableChart";

const Wingo = () => {
  return (
    <div className="w-full space-y-4">
      <Wallet />
      <NoticeBar />
      <WingoList />
      <TimerCard />
      <GameSelector />
      <TableChart />
    </div>
  );
};

export default Wingo;
