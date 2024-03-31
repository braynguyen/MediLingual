import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import CheckTable from "views/admin/default/components/CheckTable";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";


const Dashboard = () => {
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Check Table */}

        {/* Live Patient Text (what they are saying) */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
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

        
        {/* <div className="grid grid-cols-1 rounded-[20px]"> */}

      </div>
    </div>
  );
};

export default Dashboard;
