'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import img from './images/register.jpg';
import logo from './images/logo.png';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
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
      email: email,
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
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>
  
      {/* TEXT */}
      <div className="w-full md:w-2/5 p-4 bg-gray-100 flex justify-center items-center flex-col pb-20">
  
        {/* Logo */}
        <Image
          src={logo}
          alt="Logo"
          className="mb-4 w-96"
        />
  
        <h1 className="text-3xl font-bold mb-5">Вписване</h1>
  
        <form name="signup_form" onSubmit={handleSignUp} className="w-full max-w-md">
  
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Потребителски Име</label>
            <input
              type="text"
              id="username"
              name="name"
              className="mt-1 p-2 w-full border rounded-md text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Електронна Поща</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Парола</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <div className="flex items-center justify-between mt-4 mb-20">
            <input type="submit" value="Sign Up" className="bg-lime-500 text-white p-2 rounded-md cursor-pointer hover:bg-lime-600 text-sm" />
          </div>
  
        </form>
      </div>
    </div>
  );  
};


export default Home;
