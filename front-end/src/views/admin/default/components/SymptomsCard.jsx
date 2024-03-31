import CardMenu from "components/card/CardMenu";
import React from "react";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "components/card";

const SymptomsCard = (props) => {
    const { symptomsListData, symptomsTitleText } = props;

    const symptomsList = symptomsListData? symptomsListData : [];

  return (
    <Card extra="pb-7 p-[20px] h-96">
      {/* task header */}
      <div className="relative flex flex-row justify-between ">
        <div className="flex items-center">
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div> */}
          <h4 className="ml-4 text-3xl font-bold text-navy-700 dark:text-white">
            {symptomsTitleText}
          </h4>
        </div>
        {/* <CardMenu /> */}
      </div>

      {/* task content */}

      <div className="h-full w-full">
        {symptomsList.map((symptom) => (
            <div className="mt-5 flex items-center justify-between p-2">
                <div className="flex items-center justify-center gap-2">
                    <Checkbox />
                    <p className="text-l text-base font-bold text-navy-700 dark:text-white">
                        {symptom}
                    </p>
                </div>
                <div>
                    <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
                </div>
            </div>
        ))
        }

      </div>
    </Card>
  );
};

export default SymptomsCard;
