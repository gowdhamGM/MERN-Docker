import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory,  useRouteMatch } from "react-router-dom";


const EditModal = () =>{
    let history = useHistory();
    const match = useRouteMatch('/client/edit/:id')
    const ide = match.params.id;
    const [table, setTable] = useState({ 
        clientName:'',
        companyName:'',
        clientStatus:'',
    });

    const { clientName, companyName} = table;
    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
    };

    useEffect(() => {        
        loadData(); 
      
    },
    []);

    const loadData = async() => {
        const result = await axios.get(`http://localhost:5000/api/clientgetdata/${ide}`)        
        setTable(result.data[0]);
        
    };


  
    const onSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/clientupddata/${ide}`, table)
        history.push('/client')
        window.location.reload(false);
    }

    return(
        <>
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit</h2>
                <form onSubmit={e => onSubmit(e)}>
       
                  
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter The Client Name"
                    name="clientName"
                    value={clientName}
                    onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
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
                <button className="btn btn-warning btn-block">Update User</button>
                </form>
            </div>
        </div>
        </>
  );
}

export default EditModal;