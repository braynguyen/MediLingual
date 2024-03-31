import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Dashboard from "views/admin/default/index";
import JsonData from 'components/sidebar/languages.json';

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        // console.log(prop);
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  // ------- SIDEBAR State -------
  const [isPatientToggled, setIsPatientToggled] = useState(false);
  const [isDoctorToggled, setIsDoctorToggled] = useState(false);

  const [selectedOptionDoctor, setSelectedOptionDoctor] = useState('English');
  const [selectedOptionPatient, setSelectedOptionPatient] = useState('English');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const handleSelectLanguageDoctor = (option) => {
    setSelectedOptionDoctor(option);
  };

  const handleSelectLanguagePatient = (option) => {
    setSelectedOptionPatient(option);
  };

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
        tempChunks = [];
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
    // console.log("audioBlob: ",audioBlob);
    formData.append('audio_file', audioBlob);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
    setAudioChunks([]); // Reset audio chunks after uploading
  };

  const togglePatientRecording = async () => {
    if (!isPatientToggled) {
      await startRecording();
    } else {
      const audioBlob = await stopRecording();
      // await uploadAudio(audioBlob);
      const response = await callPatientEndpoint(selectedOptionDoctor);
      console.log(response);
    }
    setIsPatientToggled(!isPatientToggled);
  };

  const toggleDoctorRecording = async () => {
    if (!isDoctorToggled) {
      await startRecording();
    } else {
      const audioBlob = await stopRecording();
      // await uploadAudio(audioBlob);
      const response = await callDoctorEndpoint(selectedOptionPatient);
      console.log(response);
    }
    setIsDoctorToggled(!isDoctorToggled);
  };


  const [translatedText, setTranslatedText] = useState('...');
  const [symptomList, setSymptomList] = useState([]);
  const callDoctorEndpoint = async (language) => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/${language}`);
      setTranslatedText(response.data.translation);
      return response.data; // Assuming the response is JSON data

    } catch (error) {
      console.error('Error calling doctor endpoint:', error);
      return null;
    }
  };

  const callPatientEndpoint = async (language) => {
    try {
      const response = await axios.get(`http://localhost:5000/patient/${language}`);
      setTranslatedText(response.data.translation);
      setSymptomList(response.data.symptoms);
      return response.data; // Assuming the response is JSON data
    } catch (error) {
      console.error('Error calling doctor endpoint:', error);
      return null;
    }
  };


  // ------- DASHBOARD State -------

  const langs = Object.keys(JsonData)

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">

      {/* Need to pass props into sidebar */}
      <Sidebar 
        open={open}
        onClose={() => setOpen(false)} 
        setIsPatientToggled={setIsPatientToggled}
        setIsDoctorToggled={setIsDoctorToggled}
        handleSelectLanguageDoctor={handleSelectLanguageDoctor}
        handleSelectLanguagePatient={handleSelectLanguagePatient}
        togglePatientRecording={togglePatientRecording}
        toggleDoctorRecording={toggleDoctorRecording}

        />
      {/* Navbar & Main Content */}
    
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
         
              <Dashboard
                  liveTranslationTitleText={JsonData[selectedOptionPatient][0]}
                  symptomsTitleText={JsonData[selectedOptionPatient][1]}
                  translatedText={translatedText}
                  symptomList={symptomList}
                />
            </div>
            <div className="p-3">
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
