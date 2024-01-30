'use client'
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/navbar';
import DateInput from '../Components/dateInput';
import configAPI from '../../config';

const Create: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photos, setPhotos] = useState<File | null>(null);
  const [date, setdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = configAPI.apiUrl;

  const handleSignUp = async () => {
    try {
      if (!date) {
        setError('Please select a date.');
        return;
      }

      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date.toISOString().split('T')[0]);

      if (photos) {
        formData.append('photos', photos);
      }

      await axios.post(`${apiUrl}/posts`, formData);
      // Redirect only after a successful request
      window.location.href = '/home';
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
    setError(null); // Clear any previous error when date changes
  };
  

  return (
    <>
      <NavBar />
      <div className='w-5/6 h-5/6 shadow-sm shadow-slate-300 rounded-xl mx-36 p-24'>
        <h1 className='my-10 font-bold'>Създай пост</h1>
        <form onSubmit={handleSignUp}>
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

          <div className='my-12 '>
            <input
              type='file'
              id='photo'
              name='photo'
              className='mt-1 p-2 w-full text-sm focus:outline-none'
              onChange={handleFileChange}
            />
          </div>
          
          <div className='flex items-center justify-between mt-4 mb-3'>
            <input
              type='submit'
              value='Създай пост'
              className='bg-green-500 text-white font-semibold p-4 rounded-lg -ml-[2px] cursor-pointer text-bold hover:bg-green-600 text-md'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
