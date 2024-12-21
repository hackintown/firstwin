import React, { useMemo } from "react";
import { IoLanguage } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";

const tools = [
  {
    icon: <IoLanguage className="text-3xl" />,
    label: "Language",
    bgColor: "bg-green-500/20",
    iconColor: "text-green-500",
  },
  {
    icon: <IoMdNotifications className="text-3xl" />,
    label: "Notification",
    bgColor: "bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  //   {
  //     icon: <BiSolidCustomerService className="text-3xl" />,
  //     label: "24/7 Customer service",
  //     bgColor: "bg-blue-500/20",
  //     iconColor: "text-blue-500",
  //   },
  {
    icon: <IoBookSharp className="text-3xl" />,
    label: "Beginner's Guide",
    bgColor: "bg-red-500/20",
    iconColor: "text-red-500",
  },
  {
    icon: <IoInformationCircle className="text-3xl" />,
    label: "About us",
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: <FaDownload className="text-3xl" />,
    label: "Download APP",
    bgColor: "bg-green-500/20",
    iconColor: "text-green-500",
  },
];

const ToolItem = ({ icon, label, bgColor, iconColor }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center ${iconColor}`}
    >
      {icon}
    </div>
    <span className="text-white text-sm text-center">{label}</span>
  </div>
);

const BasicTools = () => {
  const headerSection = useMemo(
    () => (
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-primary rounded-full"></div>
        <h2 className="text-lg font-semibold text-white">Basic Tools</h2>
      </div>
    ),
    []
  );

  return (
    <div>
      {headerSection}
      <div className="bg-card p-6 rounded-xl">
        <div className="grid grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <ToolItem key={index} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicTools;
