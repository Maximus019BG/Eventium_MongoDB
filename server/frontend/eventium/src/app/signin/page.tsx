'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import img from '../images/register.jpg';


const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    

    
    axios.get(`${apiUrl}/`)
      .then(response => {
        // Handle the successful response here
        console.log('Response:', response.data);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error.message);
      });   

    axios.post(`${apiUrl}/user/signup`, {
      name: username,
      password: password,
    })
    .then((response) => {
      // Handle the response if needed
      console.log(response.data);
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
        <Image
          src={img}
          alt="Signin"
          className="w-full h-full object-cover"
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

         {/* IMG with Gradient */}
    <div className='w-screen -mt-8'>
         <div
          className='w-screen absolute mt-11/12 h-1/3 xl:hidden md:w-0 sm:w-screen sm: overflow-shown mx-0 -mb-20 z-10'
          style={{
            background: 'linear-gradient(to bottom, white, rgba(255, 255, 255, 0))', // Replace with your desired gradient colors
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           }}
          />
        </div>
         {/* small divice background */}
        <div className='w-screen  h-2/3 xl:hidden md:w-0 sm:w-screen sm: overflow-clip mx-0 -mb-20 '> 
        <Image
          src={img}
          alt="Signin2"
          className="w-full h-full object-cover"
        />
        </div>
      </div>
    </div>
  );  
};


export default Home;
