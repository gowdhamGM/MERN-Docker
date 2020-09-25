import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';


const AddModal = () =>{
    let history = useHistory();
    const [table, setTable] = useState({        		
        clientName:'',
        companyName:'',
        clientStatus:''

    });

    const {clientName, companyName} = table;

    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
    }; 
    
    const onSubmit = (e) => {
        e.preventDefault();
        // setTable({...table, taskname:box})
        axios.post('http://localhost:5000/api/clientpostdata', table).then(res=>{
          toast.success("New Cilent Added") ;
          history.push('/client') 
          window.location.reload(false); 
        }).catch(err=>{
            toast.error(err.response.data)
        })
        console.log(table)
              
    }

   
    return(
        <>
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">New Client</h2>
                <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <label className="sr-only">Client Name</label>
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter The ClientName"
                    name="clientName"
                    value={clientName}
                    onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                <label className="sr-only">Client Company Name</label>
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Client Company Name"
                    name="companyName"
                    value={companyName}
                    onChange={e => onInputChange(e)}
                    />
                </div>              
                <div className="form-group">
                    <select 
                        name="clientStatus"
                        onChange={e => onInputChange(e)}
                        className="form-control" id="sel1">
                            <option value="">--Select Status--</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>                           
                    </select>                               
                </div>                 	
                <button className="btn btn-primary btn-block">Create Client</button>
                </form>
            </div>
        </div>
        </>
  );
}

export default AddModal;