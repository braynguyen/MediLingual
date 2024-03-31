import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";



import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";

import TranslateCard from "./components/TranslateCard";
import SymptomsCard from "./components/SymptomsCard";
import { useEffect } from "react";


const Dashboard = () => {

  useEffect( async () => {
    const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
    console.log('Microphone permission status:', permissionStatus.prompt);
  }, []);
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}

        {/* Live Patient Text (what they are saying) */}
        <div>
          <TranslateCard
            titleData="Live Translation"
            cardTextData="This is the translation of what the patient is saying."
          />
        </div>

        
        {/* Complex Table , Task & Calendar */}
        {/* Reported Symptoms */}
        <SymptomsCard
          symptomsListData={[
            "Fever",
            "Cough",
            "Shortness of Breath",
            "Fatigue",
            "Muscle or Body Aches",
            "Headache",
            "New Loss of Taste or Smell",
            "Sore Throat",
            "Congestion or Runny Nose",
            "Nausea or Vomiting",
            "Diarrhea",
          ]}  
        />
        
    </div>
  </div>
  );
};

export default Dashboard;
