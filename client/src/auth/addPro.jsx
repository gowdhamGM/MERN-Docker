import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';


const AddPro = () =>{
    let history = useHistory();
    const [checkbox, setCheckbox] = useState([]);
    const[clientnamedrp, setClientnamedrp] = useState([]);
    const [box, setBox] = useState(false);
    const [table, setTable] = useState({        		
        clientName:'',
        projectName:'',
        proStatus:'',
        

    });
    const { clientName, projectName, proStatus} = table;

    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
    }; 

    useEffect(() => {
        clientNameGet();
    }, [])
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(clientName) 
        
        
        axios.post(`http://localhost:5000/api/clientpostpro/${clientName}`,table).then(res=>{
            toast.success("New Project Added") ;
            history.push('/project') 
           // window.location.reload(false); 
          }).catch(err=>{
              toast.error(err.response.data)
          })    
    }
    

    const clientNameGet = (e) => {
        axios.get('http://localhost:5000/api/clientgetdata')
        .then(response => {
            setClientnamedrp(response.data)
        }).catch(function (error){
            console.log(error); 
        })
    }
  
   
    return(
        <>
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add Project</h2>
                <form onSubmit={e => onSubmit(e)}>
                
                <div className="form-group">
                <select 
                        name="clientName"
                        onChange={e => onInputChange(e)}
                        className="form-control" id="sel1">
                            <option value="">--Select Client--</option>
                        {
                            clientnamedrp.map(item => {
                           return  <option value={item.clientName}>{item.clientName}</option>
                            })
                        }                                                                           
                </select>
                </div>
                
                <div className="form-group">
                <label className="sr-only">Project Name</label>
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter The Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={e => onInputChange(e)}
                    />
                </div>              
                <div className="form-group">
                    <select 
                        name="proStatus"
                        onChange={e => onInputChange(e)}
                        className="form-control" id="sel1">
                            <option value="">--Select Status--</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>                           
                    </select>                               
                </div>       	
                <button className="btn btn-primary btn-block">Create Project</button>
                </form>
            </div>
        </div>
        </>
  );
}

export default AddPro;

