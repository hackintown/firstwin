import React, { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ChartTable from "./ChartTable";
import { useSelector } from "react-redux";
import socketService from "../../../services/socketService";
import { cn } from "../../../lib/utils";

const TableChart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("game-history");
  const [localHistory, setLocalHistory] = useState([]);
  const itemsPerPage = 10;

  const activeGameType = useSelector((state) => state.wingo.activeGameType);
  const countdown = useSelector((state) => state.wingo.games[activeGameType]?.countdown?.value || 0);
  const reduxHistory = useSelector(
    (state) => state.wingo.games[activeGameType]?.history || []
  );

  // Add effect to handle countdown completion
  useEffect(() => {
    if (countdown === 0) {
      // Small delay to ensure backend has processed the result
      const timeoutId = setTimeout(() => {
        socketService.getGameHistory(activeGameType, 50).then((newHistory) => {
          if (newHistory) {
            setLocalHistory(newHistory);
          }
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [countdown, activeGameType]);

  // Modified socket listener for real-time updates
  useEffect(() => {
    if (!socketService.socket) return;

    const handleNewResult = (result) => {
      if (result.gameType === activeGameType) {
        socketService.getGameHistory(activeGameType, 50).then((newHistory) => {
          if (newHistory) {
            setLocalHistory(newHistory);
            setCurrentPage(1);
          }
        });
      }
    };

    const handleGameUpdate = () => {
      socketService.getGameHistory(activeGameType, 50).then((newHistory) => {
        if (newHistory) {
          setLocalHistory(newHistory);
        }
      });
    };

    socketService.socket.on('gameResult', handleNewResult);
    socketService.socket.on(`${activeGameType}:newResult`, handleNewResult);
    socketService.socket.on(`${activeGameType}Update`, handleGameUpdate);

    // Initial fetch
    handleGameUpdate();

    return () => {
      socketService.socket.off('gameResult', handleNewResult);
      socketService.socket.off(`${activeGameType}:newResult`, handleNewResult);
      socketService.socket.off(`${activeGameType}Update`, handleGameUpdate);
    };
  }, [activeGameType]);

  // Add polling mechanism for backup
  useEffect(() => {
    const pollInterval = setInterval(() => {
      socketService.getGameHistory(activeGameType, 50).then((newHistory) => {
        if (newHistory) {
          setLocalHistory(newHistory);
        }
      });
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [activeGameType]);

  // Calculate pagination using localHistory instead of redux history
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = localHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(localHistory.length / itemsPerPage);

  const tabs = [
    { id: "game-history", label: "Game history" },
    { id: "chart", label: "Chart" },
    { id: "my-history", label: "My history" },
  ];

  // statistics data
  const statisticsData = {
    winningNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    missing: [6, 11, 11, 13, 19, 6, 9, 6, 13, 6],
    avgMissing: [6, 11, 13, 13, 19, 6, 9, 6, 13, 6],
    frequency: [13, 8, 8, 7, 4, 14, 10, 15, 9, 12],
    maxConsecutive: [2, 2, 2, 2, 1, 2, 1, 2, 2, 1],
  };

  const getNumberColor = (number) => {
    const colorMap = {
      0: {
        background: 'linear-gradient(180deg, #D23838 50.96%, rgb(182, 89, 254) 50.97%)',
        isGradient: true
      },
      1: "text-[#17B15E]", //green
      2: "text-[#D23838]", //red
      3: "text-[#17B15E]", //green
      4: "text-[#D23838]", //red
      5: {
        background: '-webkit-linear-gradient(top, #17B15E 51.48%, rgb(182, 89, 254) 51.49%)',
        backgroundImage: 'linear-gradient(180deg, #17B15E 51.48%, rgb(182, 89, 254) 51.49%)',
        isGradient: true
      },
      6: "text-[#D23838]", //red
      7: "text-[#17B15E]", //green
      8: "text-[#D23838]", //red
      9: "text-[#17B15E]" //green
    };
    return colorMap[number] || "text-white";
  };

  const renderGameHistory = () => (
    <div className="rounded-lg bg-card border border-gray-700 overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <thead className="text-nowrap">
          <tr className="bg-gray-800 text-gray-200 border-b border-gray-700">
            <th className="px-2 py-3 text-center font-semibold w-[40%]">
              Period
            </th>
            <th className="px-2 py-2 text-center font-semibold w-[20%]">
              Number
            </th>
            <th className="px-2 py-2 text-center font-semibold w-[20%]">
              Big/Small
            </th>
            <th className="px-2 py-2 text-center font-semibold w-[20%]">
              Color
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {currentItems.map((item, index) => (
            <tr
              key={`${item?.period}-${item?.number}`}
              className={cn(
                "hover:bg-gray-800/50 transition-colors duration-150",
                index === 0 && "animate-highlight"
              )}
            >
              <td className="p-2 text-center text-foreground text-xs truncate">
                {item?.period}
              </td>
              <td
                className={`p-2 text-center font-bold text-2xl ${typeof getNumberColor(item?.result?.number) === 'string'
                  ? getNumberColor(item?.result?.number)
                  : ''
                  }`}
                style={{
                  ...(typeof getNumberColor(item?.result?.number) === 'object'
                    ? {
                      background: getNumberColor(item?.result?.number).background,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                    : {})
                }}
              >
                {item?.result?.number}
              </td>
              <td className="p-2 text-center text-foreground">
                {item?.result?.size}
              </td>
              <td className="p-0">
                <div className="flex justify-center items-center gap-2">
                  {item?.result?.color === "red" && (
                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                  )}
                  {item?.result?.color === "green" && (
                    <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  )}
                  {item?.result?.color === "violet" && (
                    <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4 pb-4 text-gray-300">
        <div className="flex gap-x-6 items-center justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-2 rounded bg-active disabled:opacity-50"
          >
            <MdArrowBackIos className="text-foreground size-6" />
          </button>
          <span className="text-sm">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, localHistory.length)}{" "}
            of {localHistory.length}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-2 rounded bg-active disabled:opacity-50"
          >
            <MdArrowForwardIos className="text-foreground size-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderChart = () => (
    <ChartTable statisticsData={statisticsData} />
  );

  const renderMyHistory = () => (
    <div className="text-center text-gray-300">My History content coming soon...</div>
  );

  return (
    <div className="w-full space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-md text-sm transition-colors ${activeTab === tab.id
              ? "bg-active text-foreground font-medium"
              : "bg-card text-muted-foreground font-normal"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "game-history" && renderGameHistory()}
      {activeTab === "chart" && renderChart()}
      {activeTab === "my-history" && renderMyHistory()}

      {/* Pagination */}
      {activeTab === "game-history" && (
        <div className="flex justify-center items-center mt-4 text-gray-300">
          <div className="flex gap-x-6 items-center justify-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-2 rounded bg-active disabled:opacity-50"
            >
              <MdArrowBackIos className="text-foreground size-6" />
            </button>
            <span className="text-sm">
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, localHistory.length)}{" "}
              of {localHistory.length}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 py-2 rounded bg-active disabled:opacity-50"
            >
              <MdArrowForwardIos className="text-foreground size-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableChart;