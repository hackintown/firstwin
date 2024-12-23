import React from "react";

const ChartTable = ({ statisticsData, gameHistory = [] }) => {
  return (
    <div className="rounded-lg bg-card border border-gray-700 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800/80 text-gray-200 border-b border-gray-700">
            <th className="px-4 py-3 text-left font-semibold">Period</th>
            <th className="px-4 py-3 text-center font-semibold">Number</th>
          </tr>
        </thead>
        <tbody className="">
          {/* Statistics Header */}
          <tr className="bg-gray-800/50">
            <td colSpan="2" className="px-2 py-2 text-gray-300 font-medium">
              Statistic (last 100 Periods)
            </td>
          </tr>

          {/* Statistics Section */}
          {[
            { label: "Winning number", data: statisticsData.winningNumbers },
            { label: "Missing", data: statisticsData.missing },
            { label: "Avg missing", data: statisticsData.avgMissing },
            { label: "Frequency", data: statisticsData.frequency },
            { label: "Max consecutive", data: statisticsData.maxConsecutive },
          ].map((row, index) => (
            <tr key={index}>
              <td className="px-2 py-2 text-foreground font-light">{row.label}</td>
              <td className="px-2 py-2">
                <div className="flex justify-center gap-1">
                  {row.data.map((value, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[14px] 
                        ${index === 0 ? 'border border-primary text-primary' : 'text-muted-foreground'}`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}

          {/* Game History Section */}
          {gameHistory.map((game, index) => (
            <tr key={index} className="hover:bg-gray-800/30">
              <td className="px-4 py-3 text-gray-300">{game.period}</td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  {game.numbers.map((num, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                        ${num.isWinning ? 'bg-red-500' : 'bg-gray-700'} 
                        text-gray-200`}
                    >
                      {num.value}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable; 