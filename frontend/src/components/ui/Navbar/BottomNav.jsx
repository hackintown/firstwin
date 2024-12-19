import { FaHome, FaGift, FaUser, FaWallet } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function BottomNav() {
  const location = useLocation();

  const tabs = [
    { icon: <FaHome size={24} />, label: "Promotion", path: "#" },
    { icon: <FaGift size={24} />, label: "Activity", path: "#" },
    {
      icon: <IoGameController size={40} />,
      label: "",
      path: "#",
      isGameTab: true,
    },
    { icon: <FaWallet size={24} />, label: "Wallet", path: "#" },
    { icon: <FaUser size={24} />, label: "Account", path: "#" },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50">
      <nav className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
        <div className="flex justify-between items-center px-2 py-3 relative">
          {tabs.map((tab) => (
            <Link key={tab.path} to={tab.path} className="relative group px-4">
              <motion.div
                className={`flex flex-col items-center gap-1.5 relative z-10 transition-all duration-300 ${
                  location.pathname === tab.path
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-primary"
                } ${
                  tab.isGameTab
                    ? "bg-primary text-primary-foreground hover:text-primary-foreground p-3 rounded-full -mt-6"
                    : ""
                }`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                {location.pathname === tab.path && !tab.isGameTab && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute -inset-3 bg-blue-500/20 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.icon}
                {tab.label && (
                  <span className="text-[10px] font-medium tracking-wide">
                    {tab.label}
                  </span>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
