import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory,useRouteMatch } from "react-router-dom";
import { toast } from 'react-toastify';
import generator from 'generate-password'




const EditEmp = () =>{
    let history = useHistory();
    const match = useRouteMatch('/employee/edit/:id')
    const ide = match.params.id;
    const [table, setTable] = useState({        		
        userName:'',
        email:'',
        password:'',
        empId:"",
        role:"emp"


    });
        const [pass,setPass]= useState();
        const passw = generator.generate({ length: 8,numbers: true});

        const reset = evt => {
            return setPass("");
          };
       

    const {userName,email,password,empId ,role} = table;

    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
    }; 

    useEffect(() => {        
        loadData(); 
      
    },
    []);

    const loadData = async() => {
        const result = await axios.get(`http://localhost:5000/api/usergetdata/${ide}`)
        setTable(result.data);
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        // setTable({...table, taskname:box})
         axios.put(`http://localhost:5000/api/empupddata/${ide}`, table).then(res=>{
          toast.success("Employee detail changed") ;
          history.push('/emp_details') 
          window.location.reload(false); 
        // }).catch(err=>{
        //     toast.error(err.response.data)
        })
        //console.log(table)
              
    }

   
    return(
        <>
        <div className="container">
            <div className="row">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit Employee</h2>
                <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <label className="sr-only">Enter User Name</label>
                    <input
                    type="text"
                    className="form-control form-control-lg"
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
                    className="form-control form-control-lg"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    onChange={e => onInputChange(e)}
                    />
                </div>  


                <form class="form-inline">
                <div className="form-group">
                
                <label className="sr-only">Enter password</label>
                    <div >
                    <input type="text" className="form-control form-control-lg" placeholder="Enter Password" name="password"
                    value={password} onChange={e => onInputChange(e)} />
                    </div>
                    <div>
                       
                       <button onClick={reset} className="btn btn-outline-primary mr-2">Reset  </button>
                    </div>
                    <div>
                        <button onClick={()=>setPass(passw)}className="btn btn-outline-primary mr-2">generate</button>
                    </div>


                    
                </div>  
                </form>
        
              <br></br>

                <div className="form-group">
                <label className="sr-only">Enter EmpID</label>
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter EmpID"
                    name="empId"
                    value={empId}
                    onChange={e => onInputChange(e)}
                    />
                </div>          
               
                <button className="btn btn-primary btn-block">Update Employee</button>
                </form>
            </div>
        </div>
        </div>
        </>
  );
    }

export default EditEmp;