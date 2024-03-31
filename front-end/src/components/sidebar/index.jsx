import React, { useState } from 'react';
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
import Switch from "components/switch";
import axios from 'axios';
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

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.addEventListener('dataavailable', (event) => {
        setAudioChunks([...audioChunks, event.data]);
      });
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error('Error recording audio:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const uploadAudio = async () => {
    try {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setAudioBlob(audioBlob);

      const formData = new FormData();
      formData.append('audio_file', audioBlob);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data); // Should print "audio file saved" if successful
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const callDoctorEndpoint = async (language) => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/${language}`);
      return response.data; // Assuming the response is JSON data
    } catch (error) {
      console.error('Error calling doctor endpoint:', error);
      return null;
    }
  };

  const callPatientEndpoint = async (language) => {
    try {
      const response = await axios.get(`http://localhost:5000/patient/${language}`);
      return response.data; // Assuming the response is JSON data
    } catch (error) {
      console.error('Error calling doctor endpoint:', error);
      return null;
    }
  };

  const handlePatientToggle = async () => {
    // handle recording 
    if (isPatientToggled) {
      startRecording();
    } else {
      stopRecording();
      await uploadAudio();
      const patientTranslation = await callPatientEndpoint();
      console.log(patientTranslation);
      // SEND THIS TO THE TRANSLATION AND SYMPTOMS CARD
    }

    setIsPatientToggled(!isPatientToggled)
  };

  const handleDoctorToggle  = async () => {
    // handle recording 
    if (isDoctorToggled) {
      startRecording();
    } else {
      stopRecording();
      await uploadAudio();
      const doctorTranslation = await callDoctorEndpoint();
      console.log(doctorTranslation);
      // SEND THIS TO THE TRANSLATION
    }

    setIsDoctorToggled(!isDoctorToggled)
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
