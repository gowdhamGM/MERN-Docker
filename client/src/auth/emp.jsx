import React from 'react'
import { useHistory,  useRouteMatch } from "react-router-dom";

const Emp = () => {
    let history = useHistory();
    let hasToken = JSON.parse(localStorage.getItem('auth'));
    if (hasToken === null || hasToken === undefined ) {
        history.push('/login'); 
    }else{
        console.log("has data")
        var name = hasToken.name;
        var role = hasToken.role;
        var empId = hasToken.empId
    }
    const logout = () => {       
        localStorage.removeItem('auth');
        history.push('/login'); 
    }

    return (

            <div className = "container">
                <h3>Hello {name}</h3>
                <h3>role {role}</h3>
                <h3>empID {empId}</h3>
                <button className="btn btn-primary" onClick={logout}>Logout</button>
             </div>
        )
    
}

export default Emp;


