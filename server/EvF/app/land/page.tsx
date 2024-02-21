'use client';
import React , { useEffect, useState, useRef } from 'react'; // Added useRef import
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';
import configAPI from './../.config';
import videoFile from '../videos/BackGLand.mp4';








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

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
  const toRegister = () => {
    router?.push('/');
  };

  const toSignIn = () => {
    router?.push('/signin');
  };

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

    <div className='h-screen dark:bg-black overflow-hidden '>
    <section className='-mt-0 '>
      <div className='h-screen absolute w-screen bg-black opacity-70  z-10'></div>
      <video src={require('../videos/BackGLand.mp4')} autoPlay muted loop className='-mt-12 fixed z-0' />
    </section>
    <div className='flex absolute top-0 left-0 h-screen w-screen items-center justify-center '>
    <section className='-ml-96 z-20 '>
      <div className='flex -ml-96 items-center justify-left h-screen'>
        <div className='text-left -mb-96'>
          <h1 className='mt-16 font-extrabold text-7xl text-white  uppercase animate-fade-in-up'>
            Добре дошли в&nbsp;
            <span className=''>
             Евентиум
            </span>
          </h1>
         <h2 className='font-extrabold text-3xl mt-2  text-white uppercase animate-fade-in-up'>
            Уеб приложението за&nbsp;
            <span className=''>
             събития
            </span>
         </h2>
          <div>

           <button onClick={toRegister} className='mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-lg animate-fade-in-up'>
            Създай акаунт
           </button>

            <button onClick={toSignIn} className='mt-4 ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-lg animate-fade-in-up'>
             Влез в акаунта си
            </button>
          </div>
        </div>
       </div>
    </section>
  
   </div>
  </div>

  );
};

export default Main;