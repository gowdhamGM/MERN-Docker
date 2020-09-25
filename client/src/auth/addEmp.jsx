import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import generator from 'generate-password'


const AddEmp = () =>{
    let history = useHistory();
    const [table, setTable] = useState({        		
        userName:'',
        email:'',
        password:'',
        empId:"",
        role:"emp"


    });

    const [pass,setPass]= useState();
    const [value1, setValue1] = useState(true);
    var passd = generator.generate({ length: 8,numbers: true});
    var {userName,email,password,empId ,role} = table;

    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
    }; 

    
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/register_emp', table).then(res=>{
        toast.success("New Employee Added") ;
        history.push('/emp_details') 
        window.location.reload(false); 
        }).catch(err=>{
            toast.error(err.response.data)
        })
        console.log(table)
              
    }

    var rand = () => {
        setPass(passd)
        table.password = passd.toString();
    }

    var disable = () => {
        setValue1(false)
    }
   
    return(
        <>
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h3 className="text-center mb-4">New Employee</h3>
                <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <label className="sr-only">Enter User Name</label>
                    <input
                    type="text"
                    className="form-control form-control"
                    placeholder="Enter The UserName"
                    name="userName"
                    value={userName}
                    onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                <label className="sr-only">Enter Email</label>
                    <input
                    type="email"
                    className="form-control form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    onChange={e => onInputChange(e)}
                    />
                </div>   
                <div className="row">
                <div class="col-md-6">
                <div className="form-group">
                <label className="sr-only" for="inputPassword">Enter password</label>
                    <input
                    id="disabledInput"
                    type="text"
                    className="form-control form-control"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={e => onInputChange(e)}

                    disabled = {value1}/>
                </div>
                </div> 
                <div class="col-3">
                   <button onClick={rand} type = "button" className = "btn btn-primary " disabled = {value1}>Generate </button>
                    <bk> </bk>
                    <button onClick={disable} type = "button" className = "btn btn-primary " >Reset</button> 
                </div>
                
                                       
                     
               
                </div>
                 
                <div className="form-group">
                <label className="sr-only">Enter EmpID</label>
                    <input
                    type="text"
                    className="form-control "
                    placeholder="Enter EmpID"
                    name="empId"
                    value={empId}
                    onChange={e => onInputChange(e)}
                    />
                </div>          
               
                <button className="btn btn-primary btn-block">Create Employee</button>
                </form>

            </div>
        </div>
        </>
  );
}

export default AddEmp;