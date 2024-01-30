'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';
import configAPI from '../../.config';
import LandIMG from '../images/land.svg';


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
   
  }, []);
  
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

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

        if (response.status === 500) {
          router.push('/signin'); // Use router directly
          return;
        }

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
        <Image
          src={LandIMG}
          alt="LandPage"
          className=""
          width={1000}
          height={900}
        />
        </section>
      <div className='flex absolute top-96 overflow-hidden'>
        <section className=''>
            <h1 className='font-extrabold text-7xl '>Добре дошли в Евентиум!</h1>
            <h2 className='font-extrabold text-5xl mt-2'>Уеб приложението за събития!</h2>
        </section>

        
      </div>

    </div>
  );
};

export default Main;