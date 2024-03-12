'use client';
import { useEffect, useState, useRef } from 'react'; // Added useRef import
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';
import configAPI from '../../.config';
import videoFile from '../videos/BackGLand.mp4';
import PlayerFn from '../land/Video';
import ReactPlayer from 'react-player';

interface DateInputProps {
  onDateChange: (date: Date) => void;
}



const Main: React.FC = () => {
  const [name, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); 
   const apiUrl = configAPI.apiUrl ;

  


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });


        if (isMounted) {
          setUsername(response.data.name);
          setDocuments(response.data.documents);
          setLoading(false);
          console.log(response.data.name)

          // Check for new storage
          const storedName = localStorage.getItem('name');

          if (storedName !== response.data.name) {
            localStorage.removeItem('name');
            const welcomeMessage = `Добре дошли "${response.data.name}" !`;
            localStorage.setItem('name', response.data.name); 
            console.log(welcomeMessage);
          }

          else if (storedName === null) {
            router?.push('/signin');
            console.log('Впишете се!');
          }
          else if (storedName === response.data.name) {
            const response = `Здравейте отново ${storedName}! `;
            console.log(response);
          }
        }
      } catch (error:any) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 500) {
          router.push('/signin'); // Use router directly
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
   
    // eslint-disable-next-line
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, null, {
        withCredentials: true, 
      });

      setAuthenticated(false);
      setUsername(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='h-screen dark:bg-black  '>
       <section className='-mt-0'>
      
        <video src={require('../videos/BackGLand.mp4')} autoPlay muted loop className='-mt-10 fix ' />
       </section>
      <div className='flex absolute top-96 overflow-hidden'>
        <section className='mt-96'>
            <h1 className='mt-16 font-extrabold text-7xl flex text-white -mb-3 uppercase'>Добре дошли в&nbsp;<p className='bg-gradient-to-r from-green-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent'>Евентиум</p></h1>
            <h2 className='font-extrabold text-5xl mt-2 text-white uppercase flex'>Уеб приложението за <p className='bg-gradient-to-r from-green-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent'>събития</p></h2>
            <section className=' -mt-2 bg-white w-screen -ml-17 '>
        
        <br></br>
        <br></br><br></br><br></br>
        
        </section>
        </section>
        
      </div>
      
    </div>
  );
};

export default Main;