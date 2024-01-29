import React, { useState, useEffect  } from 'react';



const SideBar: React.FC = () => {
  const [isSpanClicked, setIsSpanClicked] = useState<boolean[]>([false, false, false]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save the dark mode preference to local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
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
    <div className={`flex flex-col items-start mt-[48px] fixed h-screen z-6 w-60 text-2xl shadow-slate-400 pt-4 ${isDarkMode ? 'dark' : ''}`}>
      <h1 className={`mb-4 ml-5 text-4xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Filters</h1>

      {filters.map((filter, index) => (
        <span
          key={index}
          className={`border ${isSpanClicked[index] ? 'border-green-500 font-medium text-green-600 bg-green-100' : 'border-white font-normal'} pl-5 font pr-3 py-2 lowercase rounded-full cursor-pointer m-3 relative unselectable`}
          onClick={() => handleSpanClick(index)}
        >
          {filter}
          {isSpanClicked[index] && (
            <span className="p-2 px-2 cursor-pointer font-bold text-2xl" onClick={() => handleSpanClick(index)}>
              &nbsp; x
            </span>
          )}
        </span>
      ))}
      <div className='relative top-24 left-8'>
        <button className='relative top-96' onClick={handleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default SideBar;