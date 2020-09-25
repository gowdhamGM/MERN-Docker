import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = (props) => {
    const [json,setJson] =  useState([]);
    useEffect(() => {
        let hasToken = JSON.parse(localStorage.getItem('auth')).token;
       
        axios.get('http://localhost:5000/api/getall',{
            headers: {'auth':hasToken}
        }).then( res => {
                console.log(res.data)
                setJson(res.data); 
            })
            .catch(err => {
                // toast.error(err.response.data);
            }) 
    },[])

    const logout = () => {       
            localStorage.removeItem('auth');
            props.history.push('/login'); 
    }
 
    return (
        <>
        <p>{JSON.stringify(json)}</p>
        <div>
            <button className="btn btn-primary" onClick={logout}>Logout
                </button>
        </div>
        </>
    )
}

export default Home;