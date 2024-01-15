'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';

const Main: React.FC = () => {
  const [name, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        if (isMounted) {
          setUsername(response.data.name);
          setDocuments(response.data.documents);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isMounted) {
          setError('Error fetching data. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='h-screen '>
      <NavBar />

      <div className='flex overflow-hidden'>

        <SideBar />

        {loading && <p>Loading data...</p>}

        {error && <p>{error}</p>}

        {name && (
          <p>
            Welcome, {name}!
          </p>
        )}

        {documents && (
          <div className='ml-80 mt-5 mr-10 mb-2 w-5/6'>
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
