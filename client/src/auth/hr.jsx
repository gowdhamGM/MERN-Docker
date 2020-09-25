import React from 'react'


const Hr = (props) => {
    let hasToken = JSON.parse(localStorage.getItem('auth'));

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

export default Hr;