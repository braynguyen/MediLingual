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
        <Card extra={"w-full h-full sm:overflow-auto px-6 h-full"}>
            <div className="flex justify-between display inline-flex">
                <header className="relative flex items-center justify-between pt-4">
                    <div className="text-3xl font-bold text-navy-700 dark:text-white">
                        {title}
                    </div>
                </header>


            </div>

            <div className="text-2xl mt-8 overflow-x-scroll xl:overflow-x-hidden">
                {cardText}
            </div>
        </Card>
    );
};

export default TranslateCard;
