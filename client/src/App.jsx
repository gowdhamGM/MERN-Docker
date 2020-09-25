import React from 'react';
import './App.css';
import Login from './auth/login';
import Register from './auth/register';
import Home from './auth/home';
import Hr from './auth/hr';
import Admin from './auth/admin';
import Emp from './auth/emp';
import Project from './auth/projectTable'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./index.css";
import Table from './auth/Table'
import EditModal from './auth/EditTable';
import AddModal from './auth/AddTable';
import AddPro from './auth/addPro';
import EditPro from './auth/editPro';
import delClient from './auth/delClient'
import ProTable from './auth/projectTable'
import DelClient from './auth/delClient';
import EmpTable from './auth/empTable'
import AddEmp from './auth/addEmp';
import EditEmp from './auth/editEmp';
import TSTable from './auth/timesheet/tstable';
import AddTest from './auth/timesheet/addTest'



const App = () => {
  return (
    <BrowserRouter>       
      <>     
        <Switch>
            <Route exact path = "/" component={Login} />  
                        
            <Route exact path = "/login" component={Login} />            
            <Route exact path = "/register" component={Register} />  
            <Route exact path = "/home" component={Home} />          
            <Route exact path = "/admin" component={Admin} />          
            <Route exact path = "/hr" component={Hr} />          
            <Route exact path = "/emp" component={Emp} />
            <Route exact path = "/delcli" component={DelClient} />
            <Route exact path = "/project" component={ProTable} />
            <Route exact path = "/client" component={Table} />  
            <Route exact path = "/emp_details" component={EmpTable} />   
            <Route exact path = "/client/edit/:id" component={EditModal} />
            <Route exact path = "/client/del/:id" component={delClient} />   
            <Route exact path = "/client/add" component={AddModal} /> 
            <Route exact path = "/employee/add" component={AddEmp} />
            <Route exact path = "/employee/edit/:id" component={EditEmp} />
            <Route exact path = "/client/addpro" component={AddPro} /> 
            <Route exact path = "/project/edit/:clientname/:projectname" component={EditPro}/>
            <Route exact path = "/timesheet/:empId" component={TSTable} />
            <Route exact path = "/addts" component={AddTest} /> 
            {/* <Route exact path = "/hrtable" component={HrTable} />  */} 
        </Switch>
        <ToastContainer />
      </>      
    </BrowserRouter> 

      
  );
}

export default App;
