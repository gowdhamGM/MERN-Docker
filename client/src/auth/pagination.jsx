import React, { useState,useEffect ,Component}   from 'react';
import axios from 'axios'
import 'bulma/css/bulma.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rvc = () => {

    const fetchData = async () => {
        const result = await axios(
          'http://localhost:5000/api/clientgetdata',
        );   
        setData(result.data);
      }; 
  
    useEffect(() => {
      fetchData();
    }, []);
    
   
    const [data, setData] = useState(""); 
    console.log(data)

    return{
        data
    }
}

export default Rvc;