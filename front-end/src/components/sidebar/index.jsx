import React, { useState } from 'react';
import { HiX } from "react-icons/hi";
import { IoLanguage, IoMicOutline, IoMicOffOutline } from "react-icons/io5";

const Sidebar = ({ open, onClose }) => {
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
    setIsPatientToggled(!isPatientToggled);
  };

  const handleDoctorToggle = () => {
    setIsDoctorToggled(!isDoctorToggled);
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
          className={`w-64 h-64 aspect-ratio-1 ${isPatientToggled ? 'bg-red-600 shadow-xl' : 'bg-green-500 shadow'} rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={handlePatientToggle}
        >
          {isPatientToggled ? <IoMicOutline className="text-white text-6xl" /> : <IoMicOffOutline className="text-white text-6xl" />}
        </button>

        {/* Selection for Patient */}
        <div className="inline-flex items-center pt-4">
          <IoLanguage className="text-2xl text-navy-700 dark:text-white" />
          <select
            value={selectedOptionPatient}
            onChange={handleSelectLanguagePatient}
            className="ml-2 text-xl font-bold text-navy-700 dark:text-white"
          >
            <option>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>

        <button
          className={`mt-4 w-64 h-64 aspect-ratio-1 ${isDoctorToggled ? 'bg-red-600 shadow-xl' : 'bg-blue-500 shadow'} rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={handleDoctorToggle}
        >
          {isDoctorToggled ? <IoMicOutline className="text-white text-6xl" /> : <IoMicOffOutline className="text-white text-6xl" />}
        </button>

        {/* Selection for Doctor */}
        <div className="inline-flex items-center pt-4">
          <IoLanguage className="text-2xl text-navy-700 dark:text-white" />
          <select
            value={selectedOptionDoctor}
            onChange={handleSelectLanguageDoctor}
            className="ml-2 text-xl font-bold text-navy-700 dark:text-white"
          >
            <option>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
