import React from "react";
import Card from "components/card";


const TranslateCard = (props) => {
  const { titleData, cardTextData } = props;
  
  const title = titleData;
  const cardText = cardTextData;

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
       {cardText}
      </div>
    </Card>
  );
};

export default TranslateCard;
