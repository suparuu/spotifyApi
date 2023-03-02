import axios from 'axios'
import React, { useEffect, useState } from 'react'


const text = () => {
    const [message,setMessage] = useState('');

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response=>setMessage(response.data.message))
        .catch(error => console.error(error));
    },[]);


  return (
    <div>{message}</div>
  )
}

export default text