'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Access API URL from configuration
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    axios.get(`${apiUrl}/`).then((response) => {
      setMessage(response.data.message);
    });
  }, []);

  return (
    <div>
      <h1>Hello from Next.js</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
