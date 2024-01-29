'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profile from '../images/profilePic.png';

const NavBar: React.FC = () => {
  const router = useRouter();
  

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className='bg-white dark:bg-gray-800 fixed w-screen flex items-center justify-between z-10 shadow-sm shadow-slate-300'> 
    
      <div className='mx-auto flex space-x-8 font-bold font-sans uppercase text-md text-black dark:text-white md:space-x-36 md:text-sd sm:space-x-16'>
        <h1 className='nav cursor-default' onClick={() => navigateTo('/home')}>Home</h1>
        <h1 className='nav cursor-default' onClick={() => navigateTo('/create')}>Create</h1>
        <h1 className='nav cursor-default' onClick={() => navigateTo('/chat')}>Chat</h1>
      </div>
       
      <div className='ml-auto flex items-center'>
        <Image
          src={profile}
          alt="Profile"
          className='w-12 mr-2 sm:mr-12'   
        />
      </div>
    </div>
  );
};

export default NavBar;