/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";

import Switch from "components/switch";


const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Parthiv <span class="font-medium ">  Patel</span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}
{/* what is the tailwind for padding left?  */}

<div className="flex flex-col items-center justify-center flex-grow">
    <button className="w-64 h-64 aspect-ratio-1 bg-blue-500 rounded-lg flex items-center justify-center" onClick={console.log("patient")}>
    
       {/* put the patient icon here */}

    </button>
    <button className="mt-4 w-64 h-64 aspect-ratio- bg-purple-700 rounded-lg flex items-center justify-center">
        {/* put the doctor icon here */}

    </button>
</div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
