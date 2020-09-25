import React,{ useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'


function Example() {
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let history = useHistory();
    
    const [table, setTable] = useState({        		
        clientname:'',
        companyname:'',
        clientstatus:''

    });

    const {clientname, companyname} = table;

    const onInputChange = e => {
        setTable({...table, [e.target.name]:e.target.value});
    }; 

    useEffect(() => {
        
    }, [])
    
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/clientpostdata', table).then(res=>{
          toast.success("New Cilent Added") ;
          history.push('/client') 
          window.location.reload(false); 
        }).catch(err=>{
            toast.error(err.response.data)
        })
        console.log(table)
              
    }

  
  
    return (
      <>
        <button type="button" class="btn btn-outline-secondary" onClick={handleShow}>Add New Row </button>
         <Modal size="xl"  show={show} onHide={handleClose}
    >
        <Modal.Body>
        <p className="text-center"><h2>ADD TASK</h2></p>

        <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
            <div className="row">
                <div className="col-md-2">        
                <p>Client:</p>        
                </div>
                <div className="col-md-4">
                <select className="form-control">
                    <option>Karl</option>
                </select>
                </div>        
                <div className="col-md-2">        
                <p className="text-right">Project:</p>        
                </div>
                <div className="col-md-4">
                <select className="form-control">
                    <option>IoT</option>
                </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                <p>Date:</p>
                </div>
                <div className="col-md-4">
                <input className="form-control" type="date"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                <p>Start Time:</p>
                </div>
                <div className="col-md-4">
                <input className="form-control" type="time" />
                </div>
                <div className="col-md-2">
                <p className="text-right">End Time:</p>
                </div>
                <div className="col-md-4">
                <input className="form-control" type="time" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                <p>Description:</p>
                </div>
                <div className="col-md-10">
                <div className="form-group">
                <textarea className="form-control" rows="6" id="comment"></textarea>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-9">

                <div clas="actionbutton">
                    <p className="button-container"><button className="btn btn-primary btn-block">Add Task</button></p>
                </div>
                </div>

            </div>
            </div>
        </div>
        </div>
                </Modal.Body>
            
            </Modal>

      </>
    );
  }
  

export default Example;
