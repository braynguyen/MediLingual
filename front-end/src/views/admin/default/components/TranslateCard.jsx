import React from "react";
import { useState } from 'react';
import Card from "components/card";
import { IoLanguage } from "react-icons/io5";

const TranslateCard = (props) => {
  const { titleData, cardTextData } = props;
  
  const title = titleData;
  const cardText = cardTextData;
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };


  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <div className="flex justify-between display inline-flex">
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
      </header>

      <div className="display inline-flex items-center pt-4">
        <IoLanguage className= "align-bottom"/>
        <div className="text-xl font-bold text-navy-700 dark:text-white items-center">
        <select
          value={selectedOption}
          onChange={handleSelect}
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

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
       {cardText}
      </div>
    </Card>
  );
};

export default TranslateCard;
