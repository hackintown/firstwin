import React, { useEffect, useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const NOTICES: string[] = [
  "🏆DmWin🏆 is an entertainment game on the largest online gaming platform, bringing fairness, security, and transparency to all players.",
  "🎉 Wish you an enjoyable experience at Dmwin.com! Thank you for trusting and accompanying DmWin! 🎉",
  "🔥 Join the action now and start winning! DmWin is your ultimate gaming destination! 🔥",
];

export default function NoticeBar() {
  const navigate = useNavigate();
  const [currentNotice, setCurrentNotice] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        if (currentNotice >= NOTICES.length - 1) {
          setIsAnimating(false);
          setCurrentNotice(0);
        } else {
          setCurrentNotice((prev) => prev + 1);
        }
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentNotice]);

  const handleDetailClick = () => {
    navigate("/notifications");
  };

  if (NOTICES.length === 0) return null;

  return (
    <div className="rounded-3xl my-6 overflow-hidden bg-notice shadow-sm">
      <div className="px-2 grid grid-cols-[auto_1fr_auto] gap-x-2 w-full items-center">
        <div className="flex items-center">
          <HiSpeakerWave className="h-5 w-5 text-primary" />
        </div>

        <div className="overflow-hidden h-[40px]">
          <div
            className={`transform ${
              isAnimating
                ? "transition-transform duration-1000 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateY(-${currentNotice * 40}px)`,
            }}
          >
            {NOTICES.map((notice, index) => (
              <div key={index} className="h-[40px] flex items-center">
                <span className="text-sm text-foreground font-light overflow-hidden max-h-[40px]">
                  {notice}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleDetailClick}
          className="px-4 py-1 text-sm text-primary-foreground bg-primary rounded-3xl hover:bg-primary/90 transition-colors"
        >
          Detail
        </button>
      </div>
    </div>
  );
}
