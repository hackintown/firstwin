import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ChartTable from "./ChartTable";

const TableChart = () => {
  const [activeTab, setActiveTab] = useState("game-history");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data - replace with your actual data
  const gameData = [
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
    {
      period: "202412221000513886",
      number: "6",
      bigSmall: "Big",
      color: "red",
    },
  ];

  const tabs = [
    { id: "game-history", label: "Game history" },
    { id: "chart", label: "Chart" },
    { id: "my-history", label: "My history" },
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gameData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(gameData.length / itemsPerPage);

  // Add statistics data
  const statisticsData = {
    winningNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    missing: [6, 11, 11, 13, 19, 6, 9, 6, 13, 6],
    avgMissing: [6, 11, 13, 13, 19, 6, 9, 6, 13, 6],
    frequency: [13, 8, 8, 7, 4, 14, 10, 15, 9, 12],
    maxConsecutive: [2, 2, 2, 2, 1, 2, 1, 2, 2, 1],
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
              key={index}
              className="hover:bg-gray-800/50 transition-colors duration-150"
            >
              <td className="p-2 text-center text-foreground text-xs truncate">
                {item.period}
              </td>
              <td
                className={`p-2 text-center font-bold text-2xl ${item.color === "red"
                  ? "text-red-500"
                  : item.color === "green"
                    ? "text-green-500"
                    : "text-purple-500"
                  }`}
              >
                {item.number}
              </td>
              <td className="p-2 text-center text-foreground">
                {item.bigSmall}
              </td>
              <td className="p-0">
                <div className="flex justify-center items-center gap-2">
                  {item.color === "red" && (
                    <>
                      <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                      <span className="text-red-500"></span>
                    </>
                  )}
                  {item.color === "green" && (
                    <>
                      <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                      <span className="text-green-500"></span>
                    </>
                  )}
                  {item.color === "purple" && (
                    <>
                      <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                      <span className="text-purple-500"></span>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderChart = () => (
    <ChartTable statisticsData={statisticsData} />
  );

  return (
    <div className="w-full space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-md text-sm transition-colors
              ${activeTab === tab.id
                ? "bg-active text-foreground font-medium"
                : "bg-card text-muted-foreground font-normal"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conditional rendering based on active tab */}
      {activeTab === "game-history" && renderGameHistory()}
      {activeTab === "chart" && renderChart()}
      {activeTab === "my-history" && renderGameHistory() /* Replace with my-history content */}

      {/* Pagination */}
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
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, gameData.length)}{" "}
            of {gameData.length}
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
    </div>
  );
};

export default TableChart;
