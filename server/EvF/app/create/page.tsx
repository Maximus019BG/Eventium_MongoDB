'use client'
import { use, useEffect } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/navbar';
import DateInput from '../Components/dateInput';
import configAPI from './../.config';
import FilePhoto from '../images/Upload.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Image1 from '../../public/Create1.gif';
import Image2 from '../../public/Create.gif';



const Create: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photos, setPhotos] = useState<File | null>(null);
  const [date, setdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = configAPI.apiUrl;
  const router = useRouter();
  const [storedName, setStoredName] = useState<string>('');

  
  
  console.log(storedName)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('name', storedName);
    }
  }, [storedName]);

  const handlePostCreation = async (event: React.FormEvent) => {
    console.log('handlePostCreation is called');
    event.preventDefault();
    try {
      console.log({ date, photos, title, description, storedName });
      console.log({ apiUrl });
      if (!date) {
        setError('Please select a date.');
        return;
      }
      if (!photos) {
        setError('Please upload a photo.');
        return;
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date.toISOString().split('T')[0]);
      formData.append('user_name', storedName);
      formData.append('photos', photos);

      const response = await axios.post(`${apiUrl}/posts`, formData, { withCredentials: true });

      console.log(response.data);

      router.push('/home');
    } catch (error) {
      console.error(error);
      setError('Error creating post. Please try again later.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos(event.target.files[0]);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setdate(date);
    setError(null); 
  };
  

  return (
    <>
      <NavBar />
      <div className='absolute right-12 flex mx-36 justify-end top-10 dark:bg-[#011E2B] bg-white overflow-hidden'>
      
      <Image src={Image1} alt="dark illustration" className=' -mt-10 mr-20 hidden dark:block' width={950} height={950} />
      <Image src={Image2} alt="light illustration" className=' -mt-10 mr-20 block dark:hidden' width={950} height={950} />
      

       <form onSubmit={(event) => handlePostCreation(event)} className='shadow-sm shadow-slate-300 mt-10 p-5 rounded-xl'>
          <div className=' w-full'>
            <h1 className='mb-10 mt-5 font-bold '>Създай пост</h1>
            <div>
              <input
                type='text'
                id='title'
                name='title'
                className='mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none input-placeholder'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder='Заглавие'
              />
            </div>

            <div className='mt-4'>
              <textarea
                id='description'
                name='description'
                className=' w-full border-0 border-green-500 border-b-2 rounded-sm text-sm p-2 focus:outline-none textarea-placeholder'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='Описание'
              />
            </div>

            <DateInput onDateChange={handleDateChange} />

           
          </div>
          <div className='flex-shrink-0'>
            <label className='flex flex-col items-center justify-center w-full h-96 border-2 border-green-600 border-dashed rounded-lg cursor-pointer bg-green-400 px-1/2  '>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Image
                  src={FilePhoto}
                  alt="Signin2"
                  className="w-24 my-2 "
                />
                <p className='mb-2 text-sm text-white px-10'><span className='font-semibold'>Качи снимка: </span> постави снимка за събитието </p>
              </div>
              <input
                type='file'
                id='photo'
                name='photo'
                className='hidden'
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className='flex items-center justify-between mt-4 mb-3'>
              <input
                type='submit'
                value='Създай пост'
                className='bg-green-400 text-white font-semibold p-4 rounded-lg -ml-[2px] cursor-pointer text-bold hover:bg-green-600 text-md'
              />
            </div>
        </form>
      </div>
      
    </>
  );
};

export default Create;
