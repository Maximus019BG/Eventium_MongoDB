'use client'
import React from 'react';


const SideBar: React.FC = () => {
  return (
    <div className=' mt-[0.5px] fixed items-center bg-white h-screen shadow-sm shadow-slate-400 z-6 w-96 overflow-hidden text-3xl pt-4'>

      <h1 className=' mb-4 text-4xl left-2 font-bold text-black'>Filters</h1>

      <form className=''>
        <input
        type="checkbox" 
        id='Filter1'
        className='' />
        <label 
        htmlFor="Filter1"
        className='text-lg'
        >
          
          Filter 1
        
        </label>

      </form>
      

    </div>
  );
}

export default SideBar;


