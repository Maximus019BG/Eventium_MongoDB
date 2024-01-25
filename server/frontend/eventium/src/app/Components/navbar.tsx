'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import profile from '../images/profilePic.png';

const NavBar: React.FC = () => {
  return (
    <div className='bg-white fixed w-screen flex items-center justify-between z-10 shadow-sm shadow-slate-300 dark:bg-slate-900 dark:text-white'>
     
      <div className='mx-auto flex space-x-8 font-bold font-sans uppercase text-md md:space-x-36 md:text-sd sm:space-x-16'>
        <Link href='/home'>
          <h1 className='nav'>Home</h1>
        </Link>
        <Link href='/create'>
          <h1 className='nav'>Create</h1>
        </Link>
        <Link href='#'>
          <h1 className='nav'>Chat</h1>
        </Link>
      </div>
       
      <div className='ml-auto flex items-center'>
        <Image
          src={profile}
          alt="Profile"
          className='w-12 mr-2 sm:mr-12'   // Needs to be made so it can be seen in dark mode
        />
      </div>
    </div>
  );
};

export default NavBar;
