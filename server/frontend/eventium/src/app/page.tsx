'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import img from './images/register.jpg';
import logo from './images/logo.png';
import Main from './signin/page';
import Link from 'next/link';
import configAPI from '../.config';




declare const window: any;



const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const errorI =  console.error("Invalid input. Please fill in all the required fields.");
 
  
 // useEffect to Google API library
 useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';
  script.onload = () => {
    // Google API library
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
        });
      });
    }
  };
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);



const handleSignUp = async (event: React.FormEvent) => {
  event.preventDefault(); // Prevent the default form submission behavior

   const apiUrl = configAPI.apiUrl ;

  try {
    const response = await axios.post(`${apiUrl}/user/signup`, {
      name: username,
      email: email,
      password: password,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check the response and handle it accordingly
    console.log(response.data);

    // Redirect only after a successful request
    window.location.href = '/signin';
  } catch (error) {
    //  errors
    console.error(error);
  }
};



  return (
    <div className="flex h-screen">
  
      {/* IMG */}
      <div className="w-full md:w-3/5 hidden md:block overflow-hidden">
      <video src={require('./videos/Signin.mp4')} 
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
  
        <h1 className="text-5xl font-mono font-bold mb-5 mt-0 xl:mt-20 md:mt-20">Вписване</h1>
  
        <form name="signup_form" onSubmit={handleSignUp} className="w-full max-w-md">
  
          <div className="my-12">
            
            <input
              type="text"
              id="username"
              name="name"
              className="mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Потребителско име'
            />
          </div>
  
          <div className="my-12">
          
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Електронна поща'
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
            <input 
             type="submit"
             value="Създай акаунт" 
             className="bg-green-500 text-white font-semibold p-4 rounded-lg cursor-pointer text-bold hover:bg-green-600 text-md"
             />
          </div>
  
        </form>

         

         {/* small divice background */}
        <div className='w-screen  h-2/3 xl:hidden md:w-0 sm:w-screen sm: overflow-clip mx-0 -mb-20 '> 
        <video src={require('./videos/Signin.mp4')} 
          autoPlay 
          muted 
          loop
          className="w-full h-full object-cover border-none"
        />
        </div>

        <div>
          <p className='absolute bottom-1 -ml-56'>Вече имаш акаунт? &nbsp;
            <Link href="../signin/" passHref className=' underline text-green-500 font-medium'>Влез в него</Link>
          </p>
        </div>
      </div>
    </div>
    
  );  
};


export default Home;
