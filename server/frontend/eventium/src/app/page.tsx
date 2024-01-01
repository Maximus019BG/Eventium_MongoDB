'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UsernameI from './Components/UsernameInput';
import EmailI from './Components/EmailInput';
import PasswordI from './Components/PasswordInput';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    axios.post(`${apiUrl}/user/signup`, {
      name: username,
      email: email,
      password: password,
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
    <div>
      <h1>Вписване</h1>

      <form name='signup_form' onSubmit={handleSignUp}>

      <UsernameI onChange={(e) => setUsername(e.target.value)} />
      <EmailI />
      <PasswordI />

        <input type='submit' value="Sign Up" className='btn' />
      </form>
    </div>
  );
};

export default Home;
