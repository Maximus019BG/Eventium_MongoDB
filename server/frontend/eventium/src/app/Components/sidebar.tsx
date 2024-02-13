import React, { useState, useEffect  } from 'react';

const SideBar: React.FC = () => {
  const [isSpanClicked, setIsSpanClicked] = useState<boolean[]>([false, false, false]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);  // Default to false

  useEffect(() => {
    // Set isDarkMode based on local storage and color scheme preference
    if (typeof window !== 'undefined') {
      setIsDarkMode(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save the dark mode preference to local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    console.log(localStorage.getItem('theme'));
  }, [isDarkMode]);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSpanClick = (index: number) => {
    const updatedIsSpanClicked = [...isSpanClicked];
    updatedIsSpanClicked[index] = !updatedIsSpanClicked[index];
    setIsSpanClicked(updatedIsSpanClicked);
  };

  const filters = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4']; // From here you can change filters
  
  return (
    <div className={`flex flex-col items-start mt-[48px] fixed h-screen z-6 w-60 text-2xl shadow-slate-400 pt-4 bg-white dark:bg-gray-800`}>
      <h1 className={`mb-4 ml-5 text-4xl text-gray-900 dark:text-white`}>Filters</h1>

      {filters.map((filter, index) => (
        <span
          key={index}
          className={`border ${isSpanClicked[index] ? 'border-green-500 font-medium text-green-600 bg-green-100' : 'border-white font-normal'} pl-5 font pr-3 py-2 lowercase rounded-full cursor-pointer m-3 relative unselectable text-gray-900 dark:text-white`}
          onClick={() => handleSpanClick(index)}
        >
          {filter}
          {isSpanClicked[index] && (
            <span className="p-2 px-2 cursor-pointer font-bold text-2xl text-gray-900 dark:text-white" onClick={() => handleSpanClick(index)}>
              &nbsp; x
            </span>
          )}
        </span>
      ))}
      <div className='relative top-24 left-8'>
        <button onClick={handleDarkMode} className="text-gray-900 dark:text-white">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default SideBar;