import React, { useState } from 'react';

interface FilterItemProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ text, selected, onClick }) => {
  return (
    <div
      className={`cursor-pointer py-2 px-4 border-b border-t border-l border-r ${
        selected ? 'border-green-500 rounded-full' : 'border-white'
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

const SideBar: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  return (
    <div className='flex flex-col items-start mt-[0.5px] fixed bg-white h-screen shadow-sm shadow-slate-400 z-6 w-60 overflow-hidden text-3xl pt-4'>
      <h1 className='mb-4 text-4xl text-black'>Filters</h1>

      <FilterItem
        text='Filter 1'
        selected={selectedFilter === 'Filter 1'}
        onClick={() => handleFilterClick('Filter 1')}
      />

      <FilterItem
        text='Filter 2'
        selected={selectedFilter === 'Filter 2'}
        onClick={() => handleFilterClick('Filter 2')}
      />

      {/* Add more filters as needed */}
    </div>
  );
};

export default SideBar;
