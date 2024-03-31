import React, { useState } from 'react';
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
import Switch from "components/switch";
import { IoLanguage } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";


const Sidebar = ({ open, onClose }) => {
  // States for toggling buttons
  const [isPatientToggled, setIsPatientToggled] = useState(false);
  const [isDoctorToggled, setIsDoctorToggled] = useState(false);

  const [selectedOptionDoctor, setSelectedOptionDoctor] = useState('');
  const [selectedOptionPatient, setSelectedOptionPatient] = useState('');

  const handleSelectLanguageDoctor = (event) => {
    setSelectedOptionDoctor(event.target.value);
  };

  const handleSelectLanguagePatient = (event) => {
    setSelectedOptionPatient(event.target.value);
  };


  const handlePatientToggle = () => {
    // handle recording 

    // setIsDoctorToggled(!isDoctorToggled)
    setIsPatientToggled(!isPatientToggled)
  };

  const handleDoctorToggle = () => {
    // handle recording 


    setIsDoctorToggled(!isDoctorToggled)
    // setIsPatientToggled(!isPatientToggled)
  };

  return (
    <div className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"}`}>
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Parthiv <span className="font-medium">Patel</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      {/* Toggle Buttons */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <button
          className={`w-64 h-64 aspect-ratio-1 ${isPatientToggled ? 'bg-green-500' : 'bg-blue-500'} rounded-lg flex items-center justify-center`}
          onClick={handlePatientToggle}
        >
          {/* Patient icon here */}
        </button>

        <div className="display inline-flex items-center pt-4">
          <IoLanguage className="align-bottom" />
          <div className="text-xl font-bold text-navy-700 dark:text-w'hite items-center">
            <select
              value={selectedOptionPatient}
              onChange={handleSelectLanguagePatient}
              className="text-xl font-bold text-navy-700 dark:text-white items-center justify-between"
            >
              <option
                className="hover:bg-yellow-200"
              >Select an option</option>
              <option className="hover:bg-yellow-200"
              >Option 1</option>
              <option className="hover:bg-yellow-200"
              >Option 2</option>
              <option value="3"
                className="hover:bg-yellow-200"
              >Option 3</option>
            </select>
          </div>
        </div>

        <button
          className={`mt-4 w-64 h-64 aspect-ratio-1 ${isDoctorToggled ? 'bg-yellow-500' : 'bg-purple-700'} rounded-lg flex items-center justify-center`}
          onClick={handleDoctorToggle}
        >
          {/* Doctor icon here */}
        </button>

        <div className="display inline-flex items-center pt-4">
          <IoLanguage className="align-bottom" />
          <div className="text-xl font-bold text-navy-700 dark:text-white items-center">
            <select
              value={selectedOptionDoctor}
              onChange={handleSelectLanguageDoctor}
              className="text-xl font-bold text-navy-700 dark:text-white items-center justify-between"
            >
              <option
                className="hover:bg-yellow-200"
              >Select an option</option>
              <option className="hover:bg-yellow-200"
              >Option 1</option>
              <option className="hover:bg-yellow-200"
              >Option 2</option>
              <option value="3"
                className="hover:bg-yellow-200"
              >Option 3</option>
            </select>
          </div>
        </div>




      </div>

    </div>
  );
};

export default Sidebar;
