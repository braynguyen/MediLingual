import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";



import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";

import TranslateCard from "./components/TranslateCard";
import SymptomsCard from "./components/SymptomsCard";
import { useEffect } from "react";


const Dashboard = ({translatedText, symptomList}) => {
  // Need the live translation here and the symptoms list
  

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
            cardTextData={translatedText? translatedText : "Loading...\n\n\n\n\n\n" }
          />
        </div>

        
        {/* Complex Table , Task & Calendar */}
        {/* Reported Symptoms */}
        <SymptomsCard
          symptomsListData={symptomList}  
        />
        
    </div>
  </div>
  );
};

export default Dashboard;
