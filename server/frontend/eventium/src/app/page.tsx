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

  // const [ data , setData ] = useState([{}])
  // useEffect(() =>{
  //    fetch('/').then(

  //     res => res.json()
  //    ).then(
  //       data=>{
  //           setData(data);
  //           console.log(data);

  //       }

  //    )}, [])
     
  return (
   <div>
      <h1>Your Component</h1>
      {message ? (
        <p>Message from API: {message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
