'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from './images/logo.png';

declare const window: any;

const Main: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
 
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:5000/'); // replace with your backend API endpoint
        setUsername(response.data.username); // assuming your API response has a 'username' field
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Loading username...</p>
      )}
    </div>
  );
};

export default Main;
