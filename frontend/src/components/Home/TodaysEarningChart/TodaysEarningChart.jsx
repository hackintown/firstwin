import React, { useMemo, useState, useCallback, useEffect } from "react";

const TodaysEarningChart = () => {
  // Generate random member data
  const generateRandomMember = useCallback(() => {
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const randomAmount = Math.floor(100000 + Math.random() * 900000).toFixed(2);

    return {
      memberId: `Mem****${randomDigits}`,
      amount: randomAmount,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomDigits}`,
    };
  }, []);

  // Initialize state with 5 random members
  const [topMembers, setTopMembers] = useState(() =>
    Array.from({ length: 5 }, generateRandomMember).sort(
      (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
    )
  );

  // Update data every 2 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setTopMembers(
        Array.from({ length: 5 }, generateRandomMember).sort(
          (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
        )
      );
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds

    return () => clearInterval(interval);
  }, [generateRandomMember]);

  const headerSection = useMemo(
    () => (
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-primary rounded-full"></div>
        <h2 className="text-lg font-semibold text-white">
          Today's Earning Chart
        </h2>
      </div>
    ),
    []
  );
  return (
    <div>
      {headerSection}
      <div className="flex flex-col pt-20 pb-10">
        <div
          className="relative grid grid-cols-3 w-full h-[150px] -mb-[0.2rem]"
          style={{
            background: "url('/images/stage.png')",
            backgroundPosition: "center bottom",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="flex flex-col items-center justify-end pb-8"
            style={{ order: 1 }}
          >
            <div className="relative -top-5">
              <img
                src="/images/crown2.webp"
                className="absolute -top-4 left-4 -translate-x-1/2 w-12 h-12"
              />
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#a8c3d6] bg-white">
                <img
                  src={topMembers[1].avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16">
                <img src="/images/place2.webp" />
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-success">{topMembers[1].memberId}</p>
              <p className="text-xs bg-primary px-4 py-1 text-primary-foreground rounded-3xl">
                ₹{topMembers[1].amount}
              </p>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-end pb-4 h-[120px]"
            style={{ order: 2 }}
          >
            <div className="relative -top-10">
              <img
                src="/images/crown1.webp"
                className="absolute -top-4 left-4 -translate-x-1/2 w-12 h-12"
              />
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ffd700] bg-white">
                <img
                  src={topMembers[0].avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16">
                <img src="/images/place1.webp" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-success">{topMembers[0].memberId}</p>
              <p className="text-xs bg-primary px-4 py-1 text-primary-foreground rounded-3xl">
                ₹{topMembers[0].amount}
              </p>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-end pb-8"
            style={{ order: 3 }}
          >
            <div className="relative -top-12">
              <img
                src="/images/crown3.webp"
                className="absolute -top-4 left-4 -translate-x-1/2 w-12 h-12"
              />
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#cd7f32] bg-white">
                <img
                  src={topMembers[2].avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16">
                <img src="/images/place3.webp" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-success">{topMembers[2].memberId}</p>
              <p className="text-xs bg-primary px-4 py-1 text-primary-foreground rounded-3xl">
                ₹{topMembers[2].amount}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {topMembers.slice(3).map((member, index) => (
            <div
              key={member.memberId}
              className="bg-card backdrop-blur-sm border border-border rounded-lg p-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg text-foreground">{index + 4}</span>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={member.avatar}
                    className="w-full h-full object-cover"
                    alt="avatar"
                  />
                </div>
                <span className="text-foreground">{member.memberId}</span>
              </div>
              <span className="bg-success text-success-foreground px-3 py-0.5 text-sm rounded-3xl">
                ₹{member.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaysEarningChart;
