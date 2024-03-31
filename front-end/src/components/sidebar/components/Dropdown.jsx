import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="relative inline-flex">
      <select
        value={selectedOption}
        onChange={handleSelect}
        className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 py-2 pl-3 pr-10 rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;