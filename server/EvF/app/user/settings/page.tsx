'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configAPI from '../../.config';
import NavBar from '../../Components/navbar';
import { useRouter } from 'next/navigation';


const ChangeSettings: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const apiUrl = configAPI.apiUrl;
    const router = useRouter();
    const [storedName, setStoredName] = useState<string | null>(null);
   

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setStoredName(localStorage.getItem('name'));

            if(localStorage.getItem('name') === null) {
                router.push('/signin');
        
            }
        }
    }, [router]);
    

      
  let type = '';
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value);
                type = 'name';
                break;
            case 'password':
                setPassword(event.target.value);
                type = 'password'
                break;
            case 'email':
                setEmail(event.target.value);
                type = 'email';
                break;
            default:
                break;
        }
    };
    
    
    const handleSubmit = (field: string) => (event: React.FormEvent) => {
        event.preventDefault();

        let data = {};
        let value = '';

        switch (field) {
            case 'username':
                data = { name: username };
                value = username;
                type = 'name';
                setStoredName(value);
                break;
            case 'password':
                data = { password: password };
                value = password;
                type = 'password';
                break;
            case 'email':
                data = { email: email };
                value = email;
                type = 'email';
                break;
            default:
                break;
        }

        axios.put(`${apiUrl}/user/${storedName}/${type}/${value}`,  {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        .then(response => {
            setMessage(`Успешно променена настройка `);
        })
        .catch(error => {
            setMessage('Грешка при промяна на настройките');
        });
    };

    return (
        <>
        <NavBar />
        <div className='h-screen dark:bg-[#011E2B] flex flex-col items-center justify-center bg-green-50'>
        
        <form className='space-y-8 p-32 bg-white light:shadow-sm shadow-slate-300 dark:bg-[#0e1d24] rounded-xl'>
            <label className='flex flex-col space-y-1'>
                <span>Име:</span>
                <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2'>
                    <input type="text" placeholder="Име" name="username" value={username} onChange={handleChange} className='px-4 py-2 bg-gray-100 rounded-md dark:bg-gray-800' />
                    <input type="submit" value="Промени Име" onClick={handleSubmit('username')} className='px-4 py-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600' />
                </div>
            </label>
            <label className='flex flex-col space-y-1'>
                <span>Електронна поща:</span>
                <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2'>
                    <input type="email" placeholder="Електронна поща" name="email" value={email} onChange={handleChange} className='px-4 py-2 bg-gray-100 rounded-md dark:bg-gray-800' />
                    <input type="submit" value="Промени Електронна поща " onClick={handleSubmit('email')} className='px-4 py-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600' />
                </div>
            </label>
            <label className='flex flex-col space-y-1'>
                <span>Парола:</span>
                <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2'>
                    <input type="password"  placeholder="Парола" name="password" value={password} onChange={handleChange} className='px-4 py-2 bg-gray-100 rounded-md dark:bg-gray-800' />
                    <input type="submit" value="Промени Парола" onClick={handleSubmit('password')} className='px-4 py-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600' />
                </div>
            </label>
            
        </form>
        {message && <p className='absolute z-50'>{message}</p>}
    </div>
    </>
    );
};

export default ChangeSettings;