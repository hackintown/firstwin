import { useEffect } from "react";
import useSound from "use-sound";

const CountdownOverlay = ({ count, onComplete }) => {
  const [playSound] = useSound("/sound/countdown.mp3");

  useEffect(() => {
    playSound();
  }, [count, playSound]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="text-8xl font-bold text-white animate-pulse">{count}</div>
    </div>
  );
};

export default CountdownOverlay;
