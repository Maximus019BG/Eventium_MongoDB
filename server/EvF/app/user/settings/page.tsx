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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (field: string) => (event: React.FormEvent) => {
        event.preventDefault();

        let data = {};
        switch (field) {
            case 'username':
                data = { name: username };
                break;
            case 'password':
                data = { password: password };
                break;
            case 'email':
                data = { email: email };
                break;
            default:
                break;
        }

        axios.put(`${apiUrl}/user/changeSettings`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        .then(response => {
            setMessage('Успешно променени настройки');
        })
        .catch(error => {
            setMessage('Грешка при промяна на настройките');
        });
    };

    return (
        <>
        <NavBar />
        <div className='h-screen dark:bg-[#011E2B] flex flex-col items-center justify-center'>
        
        <form className='space-y-4'>
            <label className='flex flex-col space-y-1'>
                <span>Име:</span>
                <div className='flex space-x-2'>
                    <input type="text" placeholder="Име" name="username" value={username} onChange={handleChange} className='px-4 py-2 rounded-md dark:bg-gray-800' />
                    <input type="submit" value="Промени Име" onClick={handleSubmit('username')} className='px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white cursor-pointer' />
                </div>
            </label>
            <label className='flex flex-col space-y-1'>
                <span>Електронна поща:</span>
                <div className='flex space-x-2'>
                    <input type="email" placeholder="Електронна поща" name="email" value={email} onChange={handleChange} className='px-4 py-2 rounded-md dark:bg-gray-800' />
                    <input type="submit" value="Промени Електронна поща " onClick={handleSubmit('email')} className='px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white cursor-pointer' />
                </div>
            </label>
            <label className='flex flex-col space-y-1'>
                <span>Парола:</span>
                <div className='flex space-x-2'>
                    <input type="password"  placeholder="Парола" name="password" value={password} onChange={handleChange} className='px-4 py-2 rounded-md dark:bg-gray-800' />
                    <input type="submit" value="Промени Парола" onClick={handleSubmit('password')} className='px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white cursor-pointer' />
                </div>
            </label>
            
        </form>
        {message && <p className='absolute z-50'>{message}</p>}
    </div>
    </>
    );
};

export default ChangeSettings;