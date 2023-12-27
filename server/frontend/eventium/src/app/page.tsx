'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [username, setMessage] = useState<string>('');

  useEffect(() => {
 
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    axios.get(`${apiUrl}/`).then((response) => {
      setMessage(response.data.username);
    });
  }, []);


     
  return (
   <div>
      <h1>Your Component</h1>
      {username ? (
        <p>Message from API: {username}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
