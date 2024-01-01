'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EmailI: React.FC = () => {
  const [email, setEmail] = useState<string>('');


  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    axios.post(`${apiUrl}/user/signup`, {
      name: email,
    })
    .then((response) => {
      // Handle the response if needed
      console.log(response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
  };

  return (
    <>
        <label>Email</label>
        <input
          type='email'
          name='email'
          className='field'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
    </>
  );
};

export default EmailI;
