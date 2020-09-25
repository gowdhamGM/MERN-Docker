import React from 'react'


const Emp = (props) => {
    let hasToken = JSON.parse(localStorage.getItem('auth'));
    if (hasToken === null || hasToken === undefined ) {
        props.history.push('/login'); 
    }else{
        console.log("has data")
        var name = hasToken.name;
    }
    const logout = () => {       
        localStorage.removeItem('auth');
        props.history.push('/login'); 
    }

    return (
        <>
        <h3>Hello {name}</h3>
        <div>
            <button className="btn btn-primary" onClick={logout}>Logout
                </button>
        </div>
        </>
    )
}

export default Emp;