import React, {  useEffect } from 'react';
import axios from 'axios';


const Admin = (props) => {
    let hasToken = JSON.parse(localStorage.getItem('auth'));

    // const [json,setJson] =  useState([]);
    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/get/${hasToken.id}`,{
            headers: {'auth':hasToken.token}
        }).then( res => {
                console.log(res.data)
                // setJson(res.data); 
            })
            .catch(err => {
                // toast.error(err.response.data);
            }) 
    })

    const logout = () => {       
            localStorage.removeItem('auth');
            props.history.push('/login'); 
    }
 
    return (
        <>
        <h3>Hello {hasToken.name}</h3>
        <div>
            <button className="btn btn-primary" onClick={logout}>Logout
                </button>
        </div>
        </>
    )
}

export default Admin;