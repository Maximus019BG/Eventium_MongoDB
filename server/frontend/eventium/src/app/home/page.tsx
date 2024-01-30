'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';
import configAPI from '../../config';


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
    <div className={`h-screen dark:bg-black  `}>
      <NavBar />
      <div className='flex overflow-hidden'>
        <SideBar />

        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}

        {authenticated && (
          <p>
            Welcome, {name}!{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
        )}

        {documents && (
          <div className='ml-80 mt-36  mr-10 mb-2 w-5/6'>
            {documents.map((document, index) => (
              <div key={index} className='mb-6 pt-6  pr-6 shadow-sm shadow-slate-300 rounded-xl w-11/12'>
                <h1 className='font-semibold text-xl pl-6 w-screen'>{document.title}</h1>
                <p className='mt-2 pl-6 w-screen'>{document.description}</p>
                
                {document.image_data && (
                  <Image
                    src={`data:image/png;base64,${document.image_data}`}
                    alt={`Image ${index}`}
                    width={300}
                    height={300}
                    className='mt-4 rounded-bl-xl '
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;