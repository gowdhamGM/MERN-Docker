import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button,Modal} from 'react-bootstrap';



const AddTest = () =>{
    let history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        
    const[clientnamedrp, setClientnamedrp] = useState([]);
    const[projectnamedrp, setProjectnamedrp] = useState([]);
    const [table, setTable] = useState({  
        employeeId:"2707",
        employeeName:"gowdham",		
        });

    const { date,workDone,durationHrs} = table;

    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
        
        console.log("onChangeSection",table.clientName)
    }; 


    useEffect(() => {
        clientNameGet();
        projectNameGet();
    }, [])



    const onSubmit = (e) => {
        e.preventDefault();    
        console.log("table",table.clientName)  
        axios.post(`http://localhost:5000/api/timesheetpostdata`,table).then(res=>{
            toast.success("New Row added") ;
           history.push(`/timesheet/${table.employeeId}`) 
           window.location.reload(false); 
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


    const projectNameGet = (e) => {
        axios.get('http://localhost:5000/api/clientgetpro/Mark')
        .then(response => {
            setProjectnamedrp(response.data)
            console.log(setProjectnamedrp)
        }).catch(function (error){
            console.log(error); 
        })
    }
  
   
    return(
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new row
            </Button>

            <Modal show={show} size="xl" onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new row</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <div className="container">                    
                    <form onSubmit={e => onSubmit(e)}>                            
        
                    <div className="row content">
                        <div className="col-sm-3 " >Status:</div>
                        <div className="col-sm-3 ">
                            <div className="form-group">
                            <select 
                                name="status"
                                onChange={e => onInputChange(e)}
                                className="form-control form-control-sm" id="sel1">
                                    <option value="">--Select Status--</option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>                           
                            </select>                               
                    </div>  
                        </div>
                        <div className="col-sm-3">Date:</div>
                        <div className="col-sm-3 ">
                            <div className="form-group">
                                <label className="sr-only">Date</label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    name="date"
                                    value={date}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>  
                        </div>
                    </div>
                  
                    <div class="row content">
                        <div class="col-sm-3" >
                            
                        Client Name:
                        </div>
                        <div class="col-sm-3 ">

                    <div className="form-group">
                    <select 
                        name="clientName"
                        onChange={e => onInputChange(e)}
                        className="form-control form-control-sm" id="sel1">
                        <option value="">--Select Client--</option>
                        {
                            clientnamedrp.map(item => {
                            return  <option value={item.clientName}>{item.clientName}</option>
                        })
                        }                                                                           
                    </select>
                    </div>

                        </div>

                        <div>
                       
                        </div>

                        <div class="col-sm-3 ">
                        Project Name:
                        </div>

                        <div class="col-sm-3 ">
                            <div className="form-group">
                            <select 
                                name="projectName"
                                onChange={e => onInputChange(e)}
                                className="form-control form-control-sm" id="sel1">
                                <option value="">--Select Project--</option>
                                {                                      
                                    projectnamedrp.map(item => {
                                     return(
                                        <>
                                        {item.project.map(e=>{
                                            return (

                                            <option value={e.projectName}>{e.projectName}</option>
                                            )
                                        }
                                        )}
                                    </>
                                )})
                                }                                                                           
                            </select>
                            </div>

                        </div>
                    </div>
                  
                    <div class="row content">
                    <div class="col-sm-3" >Task:</div>
                    <div class="col-sm-9 ">
                    <div className="form-group">
                    <select 
                        name="taskName"
                        onChange={e => onInputChange(e)}
                        className="form-control form-control-sm" id="sel1">
                            <option value="">--Select Task--</option>
                            <option value="Design">Design</option>
                            <option value="Coding">Coding</option>
                            <option value="Testing">Testing</option>  
                            <option value="Analysis">Analysis</option> 
                            <option value="Project discussion">Project discussion</option>   
                            <option value="Learning">Learning</option>   
                            <option value="Deployment">Deployment </option>   
                            <option value="Work Flow">Work Flow</option>   
                            <option value="Estimation">Estimation</option>   
                            <option value="Manage Team">Manage Team</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Discussion">Discussion</option>
                            <option value="Setup">Setup</option>
                            <option value="Git">Git</option>                                                      
                    </select>                               
                    </div> 
                    </div>
                    </div>


                    <div class="row content">
                    <div class="col-sm-3" >Work Done:</div>
                        <div class="col-sm-9 ">
                        <div class="form-group">
                            <textarea type="text"
                                        rows="5"
                                        className="form-control form-control-sm"
                                        placeholder="Enter The work done"
                                        name="workDone"
                                        value={workDone}
                                        onChange={e => onInputChange(e)}>
                            </textarea>
                        </div>
                        </div>
                        </div>
                        
                       
                    <div class="row content">
                        <div class="col-sm-3" >Duration:</div>
                        <div class="col-sm-3 "><div className="form-group">
                            <label className="sr-only">Duration Hrs</label>
                            <input
                            type="time"
                            className="form-control form-control-sm"
                            placeholder="Enter The Duration Hrs"
                            name="durationHrs"
                            value={durationHrs}
                            onChange={e => onInputChange(e)}
                            />
                        </div> 
                        </div>
                    </div>                         
                    <button className="btn btn-primary btn-block">Create Project</button>
                    </form>
                    </div>
                   </Modal.Body>
            </Modal>
        </>
  );
}

export default AddTest

