'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from './images/logo.png';
import NavBar from '../Components/navbar';

declare const window: any;

const Main: React.FC = () => {
  const [name, setUsername] = useState<string | null>(null);

  useEffect(() => {
 
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:5000/'); // replace with your backend API endpoint
        setUsername(response.data.name); 
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div>
      {/* {name ? (
        <p>Welcome, {name}!</p>
      ) : (
        <p>Loading username...</p>
      )} */}

      <NavBar />


    </div>
  );
};

export default Main;
