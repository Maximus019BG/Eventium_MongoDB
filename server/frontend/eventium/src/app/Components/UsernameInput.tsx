'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UsernameI: React.FC = () => {
  const [username, setUsername] = useState<string>('');


  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    axios.post(`${apiUrl}/user/signup`, {
      name: username,
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
        <label>Username</label>
        <input
          type='text'
          name='name'
          className='field'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
    </>
  );
};

export default UsernameI;
