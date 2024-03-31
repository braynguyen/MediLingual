
// export default Sidebar;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiX } from "react-icons/hi";
import { IoLanguage, IoMicOutline, IoMicOffOutline } from "react-icons/io5";

const Sidebar = ({ open, onClose }) => {
  const [isPatientToggled, setIsPatientToggled] = useState(false);
  const [isDoctorToggled, setIsDoctorToggled] = useState(false);
  const [selectedOptionDoctor, setSelectedOptionDoctor] = useState('English');
  const [selectedOptionPatient, setSelectedOptionPatient] = useState('English');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    return () => {
      mediaRecorder?.stream.getTracks().forEach(track => track.stop());
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    let tempChunks = [];

    recorder.ondataavailable = event => {
        if (event.data.size > 0) {
            tempChunks.push(event.data);
        }
    };

    recorder.onstop = async () => {
        // Ensure you create the Blob here, once recording is stopped and data is fully available
        const audioBlob = new Blob(tempChunks, { type: 'audio/webm;codecs=opus' });
        await uploadAudio(audioBlob); // Consider uploading directly in onstop to ensure sequence
        // Reset audioChunks state if necessary, or handle accordingly
    };

    recorder.start();
    setMediaRecorder(recorder);
};

const stopRecording = () => {
    if (mediaRecorder) {
        mediaRecorder.stop(); // This will eventually trigger the onstop event
    }
};


  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    console.log("audioBlob: ",audioBlob);
    formData.append('audio_file', audioBlob);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
    setAudioChunks([]); // Reset audio chunks after uploading
  };

  const togglePatientRecording = async () => {
    await toggleRecording(isPatientToggled, setIsPatientToggled);
  };

  const toggleDoctorRecording = async () => {
    await toggleRecording(isDoctorToggled, setIsDoctorToggled);
  };

  // Reusable toggle function for both patient and doctor recording
  const toggleRecording = async (isToggled, setToggled) => {
    if (!isToggled) {
      await startRecording();
    } else {
      // const audioBlob = await stopRecording();
      // await uploadAudio(audioBlob);
      const response = isToggled === isPatientToggled ? await callPatientEndpoint(selectedOptionPatient) : await callDoctorEndpoint(selectedOptionDoctor);
      console.log(response);
    }
    setToggled(!isToggled);
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

  const handleSelectLanguageDoctor = (event) => {
    setSelectedOptionDoctor(event.target.value);
  };

  const handleSelectLanguagePatient = (event) => {
    setSelectedOptionPatient(event.target.value);
  };

  return (
    <div className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"}`}>
      <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={onClose}>
        <HiX />
      </span>

      <div className="mx-[56px] mt-[50px] flex items-center">
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Parthiv <span className="font-medium">Patel</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <div className="flex flex-col items-center justify-center flex-grow">
        <button
          className={`w-64 h-64 aspect-ratio-1 ${isPatientToggled ? 'bg-red-600 shadow-xl' : 'bg-green-500 shadow'} rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={togglePatientRecording}
        >
          {isPatientToggled ? <IoMicOffOutline className="text-white text-6xl" /> : <IoMicOutline className="text-white text-6xl" />}
          <span className="pl-4 text-white font-bold">Patient</span>
        </button>

        <div className="inline-flex items-center pt-4">
          <IoLanguage className="text-2xl text-navy-700 dark:text-white" />
          <select
            value={selectedOptionPatient}
            onChange={handleSelectLanguagePatient}
            className="ml-2 text-xl font-bold text-navy-700 dark:text-white"
          >
            <option>Select an option</option>
            <option>English</option>
            <option>Italian</option>
            <option value="3">Gujarati</option>
          </select>
        </div>

        <button
          className={`mt-4 w-64 h-64 aspect-ratio-1 ${isDoctorToggled ? 'bg-red-600 shadow-xl' : 'bg-blue-500 shadow'} rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={toggleDoctorRecording}
        >
          {isDoctorToggled ? <IoMicOffOutline className="text-white text-6xl" /> : <IoMicOutline className="text-white text-6xl" />}
          <span className="pl-4 text-white font-bold">Doctor</span>
        </button>

        <div className="inline-flex items-center pt-4">
          <IoLanguage className="text-2xl text-navy-700 dark:text-white" />
          <select
            value={selectedOptionDoctor}
            onChange={handleSelectLanguageDoctor}
            className="ml-2 text-xl font-bold text-navy-700 dark:text-white"
          >
            <option>Select an option</option>
            <option>English</option>
            <option>Italian</option>
            <option value="3">Gujarati</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
