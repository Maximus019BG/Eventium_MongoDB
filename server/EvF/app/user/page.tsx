'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NavBar from '../Components/navbar';
import Hero from '../images/hero.jpg';
import SettingsI from '../images/settings.png';
import EventI from '../images/event.png';
import SideBar from '../Components/sidebar';
import configAPI from '../.config';
import SearchBar from '../Components/SearchBar';
import { useRouter } from 'next/navigation';

const ProfilePage: React.FC = () => {
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
    const [storedName, setStoredName] = useState<string | null>(null);

   
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setStoredName(localStorage.getItem('name'));

            if(localStorage.getItem('name') === null) {
                router.push('/signin');
        
            }
        }
    }, [router]);


    const clickEvents = () => {
        router.push('/user/my-events');
    }

    const clickSettings = () => {
        router.push('/user/settings');
    }
 
    


    return (
        <div className={`h-screen dark:bg-[#011E2B] `}>
        <NavBar />
        <div className="relative">
            <Image
                src={Hero}
                alt="Hero"
                width={1920}
                height={1080}
                className='object-cover w-full h-96 z-0'
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-50 z-10"></div>
            <h1 className="absolute text-4xl font-bold left-24 top-24 text-white z-20">Здравейте {storedName}!</h1>
        </div>
        <div className="flex  items-center justify-center mt-10">
         
                <button className="bg-green-500 text-white px-64 py-10  m-4 rounded-lg flex flex-col items-center" onClick={clickSettings}>
                    <Image src={SettingsI} alt="Settings" width={200} height={200} /> 
                    <center>
                        <span className="ml-2 w-40 text-3xl font-semibold">Настройки</span>
                    </center>
                </button>
           
          
                <button className="bg-green-500 text-white px-64 py-10  m-4 rounded-lg flex flex-col items-center" onClick={clickEvents}>
                    <Image src={EventI} alt="Events" width={200} height={200} /> 
                    <center>
                        <span className="ml-2 w-40 text-3xl font-semibold">Събития</span>
                    </center>
                </button>
          
        </div>
    </div>
    );
};

export default ProfilePage;