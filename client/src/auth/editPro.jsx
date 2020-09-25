import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory,  useRouteMatch } from "react-router-dom";


const EditPro = () =>{
    let history = useHistory();
    const match = useRouteMatch('/project/edit/:clientName/:projectName')
    const clientName1 = match.params.clientName;
    const projectName1 = match.params.projectName;
    const[clientnamedrp, setClientnamedrp] = useState([]);
    const [table, setTable] = useState({ 
        clientName: '',
        projectName: '',
        proStatus:''
    });




    const { clientName,projectName,proStatus} = table;
    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
    };

    useEffect(() => {        
        loadData(); 
        clientNameGet();       
    },
    []);

    const loadData = async() => {
        const result = await axios.get(`http://localhost:5000/api/clientgetpro/${clientName1}`)
        setTable(result.data);

    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(table)
        console.log("clientname",clientName)
        console.log("projectname",projectName)
        axios.put(`http://localhost:5000/api/clientupdpro/${clientName1}/${projectName1}`, table)
        history.push('/project')
        window.location.reload(false);
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
                <h2 className="text-center mb-4">Edit Project</h2>
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
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Project Name"
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
               
                <button className="btn btn-warning btn-block">Update Project</button>
                </form>
            </div>
        </div>
        </>
  );
}

export default EditPro;