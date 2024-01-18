import React, { useState } from 'react';

const SideBar: React.FC = () => {
  const [isSpanClicked, setIsSpanClicked] = useState<boolean[]>([false, false, false]);

  const handleSpanClick = (index: number) => {
    const updatedIsSpanClicked = [...isSpanClicked];
    updatedIsSpanClicked[index] = !updatedIsSpanClicked[index];
    setIsSpanClicked(updatedIsSpanClicked);
  };

  const filters = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4']; // Add more filters as needed

  return (
    <div className='flex flex-col items-start mt-[113px] fixed bg-white h-screen shadow-sm shadow-slate-400 z-6 w-60 overflow-hidden text-3xl pt-4'>
      <h1 className='mb-4 text-4xl text-black'>Filters</h1>

      {filters.map((filter, index) => (
        <span
          key={index}
          className={`border ${isSpanClicked[index] ? 'border-green-500 bg-green-100' : 'border-white'} p-1 rounded-full cursor-pointer m-3 relative`}
          onClick={() => handleSpanClick(index)}
        >
          {filter}
          {isSpanClicked[index] && (
            <span className="p-2 px-2 cursor-pointer" onClick={() => handleSpanClick(index)}>
              x
            </span>
          )}
        </span>
      ))}
    </div>
  );
};

export default SideBar;
