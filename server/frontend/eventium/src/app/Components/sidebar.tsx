import React, { useState, useEffect  } from 'react';



const SideBar: React.FC = () => {
  const [isSpanClicked, setIsSpanClicked] = useState<boolean[]>([false, false, false]);
  
  const handleSpanClick = (index: number) => {
    const updatedIsSpanClicked = [...isSpanClicked];
    updatedIsSpanClicked[index] = !updatedIsSpanClicked[index];
    setIsSpanClicked(updatedIsSpanClicked);
  };

  const filters = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4']; // From here you can change filters
  
  return (
    <div className='flex flex-col items-start mt-[48px] fixed bg-white h-screen shadow-sm shadow-slate-400 z-6 w-60  text-2xl pt-4 dark:bg-slate-900 dark:text-white'>
      <h1 className='mb-4 ml-5 text-4xl text-black dark:text-white'>Filters</h1>

      {filters.map((filter, index) => (
        <span
          key={index}
          className={`border ${isSpanClicked[index] ? 'border-green-500 font-medium text-green-600 bg-green-100' : 'border-white font-normal'} pl-5 font  pr-3 py-2 lowercase rounded-full cursor-pointer m-3 relative unselectable`}
          onClick={() => handleSpanClick(index)}
        >
          {filter}
          {isSpanClicked[index] && (
            <span className="p-2 px-2 cursor-pointer font-bold text-2xl " onClick={() => handleSpanClick(index)}>
              &nbsp; x
            </span>
          )}
        </span>
      ))}
        <div className='relative top-24 left-8'>
          <button className='relative top-96 '> 
            Dark mode
          </button> {/* Dark mode can be made by an onClick and a className which changes the color */}
        </div>
    </div>
  );
};

export default SideBar;