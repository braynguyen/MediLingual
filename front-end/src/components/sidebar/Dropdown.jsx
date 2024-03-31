import React, { useState, useEffect } from 'react';
import { IoLanguage } from "react-icons/io5";

const Dropdown = ({ options, onSelect }) => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };


    return (
        <div className="display inline-flex items-center pt-4">
            <IoLanguage className="align-bottom" />
            <div className="text-xl font-bold text-navy-700 dark:text-white items-center">
                <select
                    value={selectedOption}
                    onChange={(e) => handleSelect(e.target.value)}
                    className="text-xl font-bold text-navy-700 dark:text-white items-center justify-between"
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;
