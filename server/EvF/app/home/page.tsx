'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';
import configAPI from './../.config';
import SearchBar from '../Components/SearchBar';
import { useRouter } from 'next/navigation'; 

const Main: React.FC = () => {
  const [name, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [filteredDocuments, setFilteredDocuments] = useState<any[] | null>(null); // Add this line
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const apiUrl = configAPI.apiUrl ;
  const router = useRouter();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // It's safe to use localStorage here
      localStorage.setItem('key', 'value');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
   
    const fetchData = () => {
      axios.get(`${apiUrl}/`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })
      .then(response => {
        if (response.status === 500) {
          router.push('/home'); 
          return;
        }

        if (isMounted) {
          setUsername(response.data.name);
          setDocuments(response.data.documents);
          setLoading(false);
          console.log(response.data)

          // Check for new storage
          const storedName = localStorage.getItem('name');

          if (storedName !== response.data.name) {
            localStorage.removeItem('name');
            const welcomeMessage = `Добре дошли "${response.data.name}" !`;
            axios.post(`${apiUrl}/`, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true,
              name: localStorage.getItem('name')
            });
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

          // Log the created_at and date_for_event fields for each document
          const documents = response.data.documents;
          
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 500) {
          router.push('/signin'); // Use router directly
        }
      });
    }; 

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [router, apiUrl]);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, null, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setAuthenticated(false);
      setUsername(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDocuments(documents);
    } else {
      const searchTermWords = searchTerm.split(' ').filter(word => word !== '');
    
      const newFilteredDocuments = documents?.filter(document =>
        searchTermWords.some(word =>
          document.title.toLowerCase().includes(word.toLowerCase()) ||
          document.description.toLowerCase().includes(word.toLowerCase()) ||
          document.date_for_event.toLowerCase().includes(word.toLowerCase()) ||
          document.user_name.toLowerCase().includes(word.toLowerCase())
        )
      );
    
      setFilteredDocuments(newFilteredDocuments || null);
    }
  }, [searchTerm, documents]);

  const handleReadMore = (index: number) => {
    if (filteredDocuments && typeof index === 'number' && index >= 0 && index < filteredDocuments.length) {
      const post = filteredDocuments[index];
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        try {
          newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #f4f4f4;
                }
                .container { 
                 
                  padding: 20px; 
                  max-width: 700px;
                  margin: 150px auto 150px auto;  
                  background-color: #fff;
                  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                }
                h1 { 
                  color: #333; 
                  font-size: 2em;
                  margin-bottom: 0.5em;
                }
                p { 
                  color: #666; 
                  line-height: 1.6;
                }
                img { 
                  max-width: 100%; 
                  height: auto; 
                  display: block;
                  margin: 1em 0;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>${post.title}</h1>
                <img src="data:image/png;base64,${post.image_data}" alt="Image ${index}" />
                <p>${post.description}</p>
                <p>${post.date_for_event}</p>
                <p>${post.user_name}</p>
              </div>
            </body>
            </html>
          `);
        } catch (error) {
          console.error('Error writing to new window:', error);
        }
      } else {
        console.error('Unable to open new window');
      }
    } else {
      console.error('Invalid index or filteredDocuments is not available');
    }
  };

  return (
    <div className={`h-screen dark:bg-[#011E2B] `}>
      <div className='fixed z-30'>
        <NavBar />
      </div>
      <div className=' flex overflow-hidden z-10'>
        <div className='fixed z-20'>
        <SideBar setFilters={setFilters} setSearchTerm={setSearchTerm} setActiveFilters={setActiveFilters} />
          
        </div>
        <div className='absolute top-16 z-10 '>
            <SearchBar filters={filters} setSearchTerm={setSearchTerm} activeFilters={activeFilters} />
          </div>
        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}
        {filteredDocuments && (
          <div className='relative z-0 ml-8 w-full xl:ml-80 md:ml-64 lg:ml-72 mt-36 mr-10 mb-2 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-9 justify-items-center align-items-center'>
            {filteredDocuments.map((document, index) => (
              <div key={index} className='relative w-96 card border border-none '>
                <figure>
                  <Image
                    src={`data:image/png;base64,${document.image_data}`}
                    alt={`Image ${index}`}
                    width={300}
                    height={300}
                    className='w-96 h-48 object-cover border-none rounded-t-md transition-transform hover:scale-125'
                  />
                </figure>
                <div className="card-body w-96 bg-slate-200 dark:bg-[#081216] border-none rounded-b-md ">
                  <h1 className='card-title font-bold'>{document.title}</h1>
                  <p className='mt-2 font-semibold w-full break-words text-gray-800 dark:text-gray-300'>
                    {document.description.length > 165 ? `${document.description.substring(0, 165)}...` : document.description}
                  </p>
                  <div className='flex flex-col mt-2'>
                    <div className='badge badge-outline mx-1 my-2 '>От {document.user_name}</div>
                  
                    <div className='badge badge-outline mx-1 my-2 '>{document.date_for_event}</div>
                    
                  </div>
                  <div className='absolute right-10 bottom-10'>
                    <button className="btn relative btn-accent mx-1 hover:bg-[#02d1d1] dark:bg-accent-600 dark:hover:bg-[#02d1d1]" onClick={() => handleReadMore(index)}>
                                        Прочети повече
                     </button>
                      </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;