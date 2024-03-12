'use client'
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/navbar';
import DateInput from '../Components/dateInput';
import configAPI from '../../.config';
import FilePhoto from '../images/Upload.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const Create: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photos, setPhotos] = useState<File | null>(null);
  const [date, setdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = configAPI.apiUrl;
  const storedName = localStorage.getItem('name') || '';
  const router = useRouter();

  console.log(storedName)
  const handlePostCreation = async () => {
    try {
      if (!date) {
        setError('Please select a date.');
        return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date.toISOString().split('T')[0]);
      formData.append('createdBy', storedName);
      if (photos) {
        formData.append('photos', photos);
      }

      await axios.post(`${apiUrl}/posts`, formData);

      localStorage.setItem('name', storedName);
      
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
      <div className='flex w-5/6 h-5/6 shadow-sm shadow-slate-300 rounded-xl mx-36 p-24 justify-between'>
        <div className=' w-full'>
          <h1 className='my-10 font-bold '>Създай пост</h1>
            <form onSubmit={handlePostCreation}>
              <div>
              <input
                type='text'
                id='title'
                name='title'
                className='mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder='Заглавие'
              />
              </div>

              <div className='my-12'>
              <input
                type='text'
                id='description'
                name='description'
                className='mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none '
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='Описание'
              />
              </div>

              

              <DateInput onDateChange={handleDateChange } />

                <div className='flex items-center justify-between mt-4 mb-3'>
                  <input
                    type='submit'
                    value='Създай пост'
                    className='bg-green-500 text-white font-semibold p-4 rounded-lg -ml-[2px] cursor-pointer text-bold hover:bg-green-600 text-md'
                  />
                </div>
              </form>
            </div>
            <div className='flex-shrink-0 ml-4'>
              <label className='flex flex-col items-center justify-center w-full h-96 border-2 border-green-600 border-dashed rounded-lg cursor-pointer bg-green-400 px-1/2 ml-16 '>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <Image
                    src={FilePhoto}
                    alt="Signin2"
                    className="w-24 my-2 "
                  />
                  <p className='mb-2 text-sm text-white'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
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
      </div>
    </>
  );
};

export default Create;
