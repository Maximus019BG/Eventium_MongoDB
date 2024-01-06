import React from 'react'
import Image from 'next/image';
import logo from '../images/logo.png'
import profile from '../images/profilePic.png'

const NavBar: React.FC = () => {
  return (
    <div className='bg-white flex items-center justify-between border-b-2 border-black'>
      {/* bg-gray-900 */}
        <Image
          src={logo}
          alt="logo"
          className='w-28'
        />
       <center>
        <div className='flex justify-center space-x-36 font-bold font-sans uppercase text-md'>
          <h1 className='nav'>Home</h1>
          <h1 className='nav'>Create</h1>
          <h1 className='nav'>Chat</h1>
        </div>
       </center>

      <Image
        src={profile}
        alt="Profile"
        className='w-12 mr-6'
      />
    </div>
  )
}

export default NavBar;