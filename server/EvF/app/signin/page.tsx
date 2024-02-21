'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import configAPI from './../.config';


const Signin: React.FC = () => {
  const [name, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const apiUrl = configAPI.apiUrl ;

 
  
  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();

   
    
    axios.post(`${apiUrl}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      name: name,
      password: password,
  })
  .then((response) => {
      // Handle the response if needed
      console.log(response.data);
  
      // Assuming the response contains a "message" indicating success
      if (response.data.message === "Login successful") {
          // Redirect 
          window.location.href = '/land';
      }
  })
  .catch((error) => {
      // Handle errors
      console.error(error);
  });
  };

  return (
    <div className="flex h-screen">
  
      {/* IMG */}
      <div className="w-full md:w-3/5 hidden md:block overflow-hidden">
      <video src={require('../videos/Signin.mp4')} 
          autoPlay 
          muted 
          loop
          className="w-full -top-1 h-full object-cover border-none"
        />
      </div>
    
  
      {/* TEXT */}
      <div className="w-full md:w-2/5 p-4 bg-white flex justify-center items-center flex-col mt-28 pb-20">
  
        {/* Logo
        <Image
          src={logo}
          alt="Logo"
          className="mb-4 w-96"
        /> */}
  
        <h1 className="text-5xl font-mono font-bold mb-5 mt-0 xl:mt-20 md:mt-20">Влизане</h1>
  
        <form name="signup_form" onSubmit={handleSignIn} className="w-full max-w-md">
  
          <div className="my-12">
            
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Потребителски Име'
            />
          </div>
          
            
  
          <div className="my-12">
           
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm  focus:outline-none "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Парола'
            />
          </div>
  
          <div className="flex items-center justify-between mt-4 mb-20">
            <input type="submit" value="Влез в акаунт" className="bg-green-500 text-white font-semibold p-4 rounded-md cursor-pointer text-bold hover:bg-green-600 text-md" />
          </div>
  
        </form>

        
   
         {/* small divice background */}
        <div className='w-screen  h-2/3 xl:hidden md:w-0 sm:w-screen sm: overflow-clip mx-0 -mb-20 '> 
       
        </div>
      </div>
    </div>
  );  
};


export default Signin;