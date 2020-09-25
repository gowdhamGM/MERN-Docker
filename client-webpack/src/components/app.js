import React from 'react';
import Login from '../auth/login';
import Register from '../auth/register';
import Home from '../auth/home';
import Hr from '../auth/hr';
import Admin from '../auth/admin';
import Emp from '../auth/emp';
import HrTable from '../auth/hrTable'

// import ProtectedRouter from './auth/protected';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import "../index.css";

const App = () => {
  return (
    <>  
      <BrowserRouter>          
            <Switch>
                <Route exact path = "/" component={Login} />            
                <Route exact path = "/login" component={Login} />            
                <Route exact path = "/register" component={Register} />  
                <Route exact path = "/home" component={Home} />          
                <Route exact path = "/admin" component={Admin} />          
                <Route exact path = "/hr" component={Hr} />          
                <Route exact path = "/emp" component={Emp} />
                <Route exact path = "/hrtable" component={HrTable} />     
            </Switch>
            <ToastContainer />     
        </BrowserRouter>
    </>
    
  
       
  );
}

export default App;
