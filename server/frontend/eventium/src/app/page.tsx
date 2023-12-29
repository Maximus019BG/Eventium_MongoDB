'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

  
const Home: React.FC = () => {
    const [username, setMessage] = useState<string>('');
  
    useEffect(() => {
   
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
      axios.get(`${apiUrl}/user/signup`).then((response) => {
        setMessage(response.data.username);
      });
    }, []);
  
  
       

  
  return (
   <div>
      <h1>Вписване</h1>

      <form name='signup_form'>
          <label>Username</label>
          <input type='text' name='name' className='field' required></input>

          <label>Email</label>
          <input type='email' name='email' className='field' required></input>

          <label>Password</label>
          <input type='password' name='password' className='field' required></input>
          

          <input type='submit' value="Sign Up" className='btn' />
      </form>
     
    </div>
  );
};

export default Home;
