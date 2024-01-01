'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import img from './images/register.jpg';

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
    <div className="flex min-h-screen">

      {/* IMG */}
      <div className="w-full md:w-1/2 hidden md:block">
        <Image
          src={img}
          alt="Signup"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="w-full md:w-1/2 p-4 bg-gray-100">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">Вписване</h1>

          <form name="signup_form" onSubmit={handleSignUp} className="w-full max-w-md">

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                name="name"
                className="mt-1 p-2 w-full border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <input type="submit" value="Sign Up" className="bg-blue-500 text-white p-3 rounded-md cursor-pointer hover:bg-blue-600" />
            </div>

          </form>
        </div>
      </div>


    </div>
  );
};

export default Home;
