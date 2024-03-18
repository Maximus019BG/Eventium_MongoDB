'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import configAPI from './../.config';
import Link from 'next/link';


const Signin: React.FC = () => {
  const [name, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const apiUrl = configAPI.apiUrl ;
  const [admin, setAdmin] = useState(false);
 
  
  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();

    
    axios.post(`${apiUrl}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      name: name,
      password: password,
      withCredentials: true,
  })
  .then((response) => {
      // Handle the response if needed
      console.log(response.data);
  
      // Assuming the response contains a "message" indicating success
      if (response.data.message === "Login successful") {
          // Redirect 
          window.location.href = '/home';
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
      <div className="hidden w-full overflow-hidden md:w-3/5 md:block">
      <video src={require('../videos/Signin.mp4')} 
          autoPlay 
          muted 
          loop
          className="object-cover w-full h-full border-none -top-1"
        />
      </div>
    
  
      {/* TEXT */}
      <div className="flex flex-col items-center justify-center w-full p-4 pb-20 bg-white md:w-2/5 mt-28">
  
        <h1 className="mt-0 mb-5 font-mono text-3xl font-bold xl:mt-20 md:mt-20">Влизане</h1>
  
        <form name="signup_form" onSubmit={handleSignIn} className="w-full max-w-md">
  
          <div className="my-12">
            
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 mt-1 text-sm text-black bg-white border-b-2 rounded-sm border-b-green-500 focus:outline-none"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Потребителско Име'
            />
          </div>
          
            
  
          <div className="my-12">
           
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-1 text-sm text-black bg-white border-b-2 rounded-sm border-b-green-500 focus:outline-none "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Парола'
            />
          </div>
  
          <div className="flex items-center justify-between mt-4 mb-20">
            <input type="submit" value="Влез в акаунт" className="p-4 font-semibold text-white bg-green-500 rounded-md cursor-pointer text-bold hover:bg-green-600 text-md" />
          </div>
  
        </form>

        
        <div>
          <p className='absolute -ml-56 bottom-1'>Нямаш акаунт? &nbsp;
            <Link href="../" passHref className='font-medium text-green-500 underline '>Създай си</Link>
          </p>

        </div>
         {/* small divice background */}
         <div className='w-screen mx-0 -mb-20 h-2/3 xl:hidden md:w-0 sm:w-screen sm: overflow-clip '> 
        <video src={require('../videos/Signin.mp4')} 
          autoPlay 
          muted 
          loop
          className="object-cover w-full h-full border-none"
        />
        </div>
      </div>
    </div>
  );  
};


export default Signin;