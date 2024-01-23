import React, { useState, useEffect } from 'react';

const SideBar: React.FC = () => {
  const [isSpanClicked, setIsSpanClicked] = useState<boolean[]>([false, false, false]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Try to get dark mode preference from localStorage
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    // Update localStorage when dark mode state changes
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleSpanClick = (index: number) => {
    const updatedIsSpanClicked = [...isSpanClicked];
    updatedIsSpanClicked[index] = !updatedIsSpanClicked[index];
    setIsSpanClicked(updatedIsSpanClicked);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
 
  const filters = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4'];


  
  return (
    <div className={`flex flex-col items-start mt-[48px] fixed ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} h-screen shadow-sm shadow-slate-400 z-6 w-60 text-2xl pt-4`}>
      <h1 className={`mb-4 ml-5 text-4xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Filters</h1>

      {filters.map((filter, index) => (
        <span
          key={index}
          className={`border ${isSpanClicked[index] ? 'border-green-500 font-medium text-green-600 bg-green-100' : 'border-white font-normal'} pl-5 pr-3 py-2 lowercase rounded-full cursor-pointer m-3 relative unselectable`}
          onClick={() => handleSpanClick(index)}
        >
          <span className={`filter-text ${isSpanClicked[index] ? 'text-green-600' : isDarkMode ? 'text-white' : 'text-black'}`}>
            {filter}
          </span>
          {isSpanClicked[index] && (
            <span className="p-2 px-2 cursor-pointer font-bold text-2xl" onClick={() => handleSpanClick(index)}>
              &nbsp; x
            </span>
          )}
        </span>
      ))}
      
      <div className={`relative top-24 left-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <button className='relative top-96' onClick={toggleDarkMode}>
          {isDarkMode ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
