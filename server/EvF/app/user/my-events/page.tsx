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
    const storedName = localStorage.getItem('name');

    

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

    const handleReadMore = (index:number) => {
        console.log(`Read more clicked for document at index ${index}`);
    };

    const handleAccordionClick = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
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
                    <div className='relative z-0 ml-8 w-full xl:ml-80 md:ml-80 lg:ml-72  mt-36 mr-10 mb-2 grid grid-cols-1 gap-9 justify-items-center align-items-center  '>
                        {filteredDocuments.map((document, index) => (
                            <div key={index} className="collapse collapse-arrow  dark:bg-base-200 bg-slate-200">
                                <input type="radio" name={`my-accordion-${index}`} checked={openAccordion === index} onChange={() => handleAccordionClick(index)} /> 
                                <div className="collapse-title text-xl text-clip text-gray-800 font-semibold dark:text-gray-200">
                                    {document.title}  <div className='badge badge-outline absolute mt-5 right-20'> {document.user_name}</div>
                                </div>
                                {openAccordion === index && (
                                    <figure>
                                        <Image
                                            src={`data:image/png;base64,${document.image_data }`}
                                            alt={`Image ${index}`}
                                            width={700}
                                            height={700}
                                            className='w-96 h-48 object-cover border-none rounded-md transition-transform hover:scale-125'
                                        />
                                    </figure>
                                )}
                                <div className="collapse-content"> 
                                    <p className='mt-2 font-semibold w-full break-words text-gray-800 dark:text-gray-300'>
                                        {document.description.length > 340 ? `${document.description.substring(0, 340)}...` : document.description}
                                    </p>
                                    <div className="flex absolute justify-end bottom-6 right-5">
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