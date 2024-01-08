'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from './images/logo.png';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';

declare const window: any;

const Main: React.FC = () => {
    const [name, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchUsername = async () => {
        try {
          const response = await axios.get('http://localhost:5000/');
          if (isMounted) {
            setUsername(response.data.name);
            setLoading(false);
            console.log(response.data); // Log the entire response
          }
        } catch (error) {
          console.error('Error fetching username:', error);
          if (isMounted) {
            setError('Error fetching username. Please try again later.');
            setLoading(false);
          }
        }
      };
  
      fetchUsername();
  
      return () => {
        isMounted = false;
      };
    }, []);
  return (
    <div className='h-screen overflow-hidden'>
      <NavBar />

      <div className='flex overflow-hidden'>

      <SideBar />

      

      {loading && <p>Loading username...</p>}

      {error && <p>{error}</p>}

      {name && (
        <p>
          Welcome, {name}!
        </p>
      ) 
      }
      </div>
    </div>
  );
};

export default Main;
