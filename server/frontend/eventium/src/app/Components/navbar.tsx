'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import logo from '../favicon.ico';
import profile from '../images/profilePic.png'

const NavBar: React.FC = () => {
  return (
    <div className='bg-white fixed w-screen flex items-center justify-between z-10 shadow-sm shadow-slate-300'>
     
        <Image
          src={logo}
          alt="logo"
          className='w-16 overflow-visible md:w-28 ml-2'
        />
       <center>
        <div className='flex justify-center space-x-8 font-bold font-sans uppercase text-md md:space-x-36 md:text-sd sm:space-x-16'>
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
       </center>

      <Image
        src={profile}
        alt="Profile"
        className='w-12 mr-2 sm:mr-12'
      />
    </div>
  )
}

export default NavBar;