'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NavBar from '../../Components/navbar';
import SideBar from '../../Components/sidebar';
import configAPI from '../../.config';
import SearchBar from '../../Components/SearchBar';
import { useRouter } from 'next/navigation';

const UserEvents: React.FC = () => {
    const [name, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [documents, setDocuments] = useState<any[] | null>(null);
    const [filteredDocuments, setFilteredDocuments] = useState<any[] | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const apiUrl = configAPI.apiUrl ;
    const router = useRouter();
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    let storedName = '';


    if (typeof window !== 'undefined') {

         storedName = localStorage.getItem('name') || '';
        
    }
    
    else if (storedName === null) {
        router?.push('/signin');
        console.log('Впишете се!');
      }

    

    useEffect(() => {
        let isMounted = true;
     
        const fetchData = () => {
            axios.get(`${apiUrl}/user/${storedName}`, { 
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
                else if (storedName === null) {
                    router.push('/signin'); 
                }

                if (isMounted) {
                    setUsername(response.data.name);
                    setDocuments(response.data.documents);
                    setLoading(false);
                    console.log(response.data)
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 500) {
                    router.push('/signin'); 
                }
            });
        }; 

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [router, apiUrl, storedName]);

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
                    max-width: 800px;
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

    const handleAccordionClick = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <div className={`h-screen dark:bg-[#011E2B] `}>
            <div className='fixed z-30'>
                <NavBar />
            </div>
            <div className='z-10 flex overflow-hidden '>
                <div className='fixed z-20'>
                    <SideBar setFilters={setFilters} setSearchTerm={setSearchTerm} setActiveFilters={setActiveFilters} />
                </div>
                <div className='absolute z-10 top-16 '>
                    <SearchBar filters={filters} setSearchTerm={setSearchTerm} activeFilters={activeFilters} />
                </div>
                {loading && <p>Loading data...</p>}
                {error && <p>{error}</p>}
                {filteredDocuments && (
                    <div className='relative z-0 grid w-full grid-cols-1 mb-2 ml-8 mr-10 xl:ml-80 md:ml-80 lg:ml-72 mt-36 gap-9 justify-items-center align-items-center '>
                        {filteredDocuments.map((document, index) => (
                            <div key={index} className="collapse collapse-arrow dark:bg-base-200 bg-slate-200">
                                <input type="radio" name={`my-accordion-${index}`} checked={openAccordion === index} onChange={() => handleAccordionClick(index)} /> 
                                <div className="text-xl font-semibold text-gray-800 collapse-title text-clip dark:text-gray-200">
                                    {document.title}  <div className='absolute mt-5 badge badge-outline right-20'> {document.user_name}</div>
                                </div>
                                {openAccordion === index && (
                                    <figure>
                                        <Image
                                            src={`data:image/png;base64,${document.image_data }`}
                                            alt={`Image ${index}`}
                                            width={700}
                                            height={700}
                                            className='object-cover h-48 transition-transform border-none rounded-md w-96 hover:scale-125'
                                        />
                                    </figure>
                                )}
                                <div className="collapse-content"> 
                                    <p className='w-full mt-2 font-semibold text-gray-800 break-words dark:text-gray-300'>
                                        {document.description.length > 340 ? `${document.description.substring(0, 340)}...` : document.description}
                                    </p>
                                    <div className="absolute flex justify-end bottom-6 right-5">
                                        <button className="btn btn-accent mx-1 hover:bg-[#02d1d1] dark:bg-accent-600 dark:hover:bg-[#02d1d1]" onClick={() => handleReadMore(index)}>
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

export default UserEvents;