'use client'
import React, { useState } from 'react';

const SideBar: React.FC = () => {
  // const [isChecked, setChecked] = useState(false);


  // const ColorChange = () => {
  //   setChecked(!isChecked);
  // };

  return (
    <div className='flex flex-col items-center mt-[0.5px] fixed bg-white h-screen shadow-sm shadow-slate-400 z-6 w-60 overflow-hidden text-3xl pt-4'>
      <h1 className='mb-4 text-4xl  text-black'>Filters</h1>

      <form
        className={`flex flex-row items-center`}
        // className={`flex flex-row items-center ${isChecked ? 'border-2 border-green-500' : ''}`}
      >
        <label htmlFor="Filter1" className='text-xl px-3 cursor-pointer'>
          
          Filter 1

        </label>

        <input
          type="checkbox"
          id='Filter1'
          className='w-6 h-6 m-2 accent-green-500 :hover:opasity-0.3 cursor-pointer'
          // checked={isChecked}
          // onChange={ColorChange}
        />
      </form>


    </div>
  );
}

export default SideBar;


