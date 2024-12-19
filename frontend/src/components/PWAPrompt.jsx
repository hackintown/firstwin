import { useState, useEffect } from "react";

const PWAPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex items-center justify-between">
      <div className="flex-1">
        <p className="font-medium">Install First Win App</p>
        <p className="text-sm text-gray-600">
          Add to your home screen for the best experience
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Install
      </button>
    </div>
  );
};

export default PWAPrompt;
