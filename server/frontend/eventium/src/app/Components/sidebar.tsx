'use client'
import React, { useState } from 'react';

const SideBar: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='flex flex-col items-start mt-[0.5px] fixed bg-white h-screen shadow-sm shadow-slate-400 z-6 w-60 overflow-hidden text-3xl pt-4'>
      <h1 className='mb-4 text-4xl text-black'>Filters</h1>

      <form className={`flex flex-row items-start `}>
        <div className={`border ${isChecked ? 'border-green-500' : 'border-white'} rounded-full p-1 flex items-center`}>
          <label
            htmlFor="Filter1"
            className={`text-xl px-2 cursor-pointer`}
          >
            Filter 1
          </label>

          <input
            type="checkbox"
            id='Filter1'
            className='w-4 h-4 m-1 accent-green-500 cursor-pointer'
            onChange={handleCheckboxChange}
          />
        </div>
      </form>
    </div>
  );
}

export default SideBar;
