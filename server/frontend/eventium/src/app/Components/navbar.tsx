import React from 'react'
import Image from 'next/image';
import logo from '../images/logo.png'
import profile from '../images/profilePic.png'

const NavBar: React.FC = () => {
  return (
    <div className='bg-white flex items-center justify-between border-b-2 border-black'>
      
        <Image
          src={logo}
          alt="logo"
          className='w-28'
        />
        <div className='flex space-x-40 font-bold text-xl'>
          <h1 className='hover:underline'>Home</h1>
          <h1 className='hover:underline'>Create</h1>
          <h1 className='hover:underline'>Chat</h1>
        </div>
     

      <Image
        src={profile}
        alt="Profile"
        className='w-12 mr-6'
      />
    </div>
  )
}

export default NavBar;