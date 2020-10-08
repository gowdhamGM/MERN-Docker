import React,{useEffect} from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom';

var loginName = '';

export default function TableNavbar() {

	useEffect(() =>{
		loginData();
	}, []);

	const logout = (props) => {       
		localStorage.removeItem('auth');
	}

	const loginData = (props) => {
		var hasToken = JSON.parse(localStorage.getItem('auth'));
      	if (hasToken === null || hasToken === undefined ) {
        	return(<Link className="logout" href="/login">Logout</Link>)        
          	// props.history.push('/login'); 
      	}else{
          	var name = hasToken.name;
          	loginName = name          
      	}
	}
	
	return (
		<div>
			<div className="hrback">
			<Navbar className="navbar navbar-expand-sm " >
				<Navbar.Brand  className="navbars"></Navbar.Brand>
				<Navbar.Toggle />            
				<Navbar.Collapse className="justify-content-end">
				<NavDropdown title="Menu" id="nav-dropdown">
				<NavDropdown.Item href="">Home</NavDropdown.Item>
				<NavDropdown.Item href="/client">Client</NavDropdown.Item>
				<NavDropdown.Item href="/project">Project</NavDropdown.Item>
				<NavDropdown.Item href="/emp_details">Employee</NavDropdown.Item>
				</NavDropdown>
				<Navbar.Text>
					<b>Hello: {loginName}</b>     
				</Navbar.Text>
				<Nav.Link className="logout" href="/login" onClick={logout}>Logout</Nav.Link>
				</Navbar.Collapse>   
			</Navbar>       
			</div>
		</div>
	)
}
