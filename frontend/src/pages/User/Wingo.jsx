import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketService from "../../services/socketService";
import Wallet from "../../components/LotteryGame/Wallet";
import NoticeBar from "../../components/User/Dashboard/NoticeBar";
import WingoList from "../../components/LotteryGame/WingoList";
import TimerCard from "../../components/LotteryGame/TimerCard/TimerCard";
import GameSelector from "../../components/LotteryGame/GameSelector/GameSelector";
import TableChart from "../../components/LotteryGame/TableChart/TableChart";

const Wingo = () => {
  const dispatch = useDispatch();
  const activeGameType = useSelector((state) => state.wingo.activeGameType);
  const currentGame = useSelector((state) =>
    state.wingo.games[activeGameType]?.currentGame
  );

  useEffect(() => {
    // Connect to socket when component mounts
    socketService.connect();

    // Subscribe to initial game type (30sec)
    socketService.subscribeToGame("30sec");

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    // Subscribe to new game type when changed
    if (activeGameType) {
      socketService.subscribeToGame(activeGameType);
      // Get game history for new game type
      socketService.getGameHistory(activeGameType);
    }
  }, [activeGameType]);

  return (
    <div className="w-full space-y-4">
      <Wallet />
      <NoticeBar />
      <WingoList />
      <TimerCard />
      <GameSelector
        gameType={activeGameType}
        currentGame={currentGame}
      />
      <TableChart gameType={activeGameType} />
    </div>
  );
};

export default Wingo;
