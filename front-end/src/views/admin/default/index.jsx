import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import Sidebar from "components/sidebar";
import Card from "components/card";
import TranslateCard from "./components/TranslateCard";


const Dashboard = () => {
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
        <TaskCard
          title="Reported Symptoms"
          task1="Landing Page Design"
          task2="Mobile App Design"
          task3="Dashboard Builder"
        />

        {/*  */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Task chart & Calendar */}

        
    </div>
  </div>
  );
};

export default Dashboard;
