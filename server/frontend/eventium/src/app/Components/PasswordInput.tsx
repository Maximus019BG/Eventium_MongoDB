'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PasswordI: React.FC = () => {
  const [password, setPassword] = useState<string>('');


  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    axios.post(`${apiUrl}/user/signup`, {
      name: password,
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
        <label>Password</label>
        <input
          type='password'
          name='password'
          className='field'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
    </>
  );
};

export default PasswordI;
