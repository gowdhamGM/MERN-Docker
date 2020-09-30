import React, { useEffect, useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import TableNavbar from './__navbar'
import {Link} from 'react-router-dom';
import PTable from './pTable'

const ProTable = () => {
  
  const [data, setData] = useState([]); 
  useEffect(() => {
    loadData();
   
  }, []);
  


  const loadData = async() => {
    axios.get('http://localhost:5000/api/clientgetdata')
      .then(response => {
        setData(response.data.map(d => {

          return{
            select: false,
            id: d._id,
            clientName : d.clientName,
            project: d.project,
            clientstatus: d.clientStatus,
           
          }
        }));
      
      }).catch(function (error) {
          console.log(error);
      })
   
  }   
  const delPro = (item,e) => {

    var option = window.confirm(`Are you sure to delete ${e.clientName} OF ${item.projectName}`)
    if(option){
      const check = axios.delete(`http://localhost:5000/api/clientdelpro/${e.clientName}/${item.projectName}`).then(res => {
      //console.log(clientname) 
      window.location.reload(false)
      })
   }
  }
    
  return (
    <>
      <TableNavbar />
      <PTable/>
      <div className="row addButton">
            <div className="col-lg-1">
            <Link
                className="btn btn-outline-primary mr-2"
                to={'/client/addpro'}
              >New</Link>
            </div>
            <div className="col-lg-1">
            {/* <button variant="primary" >Delete</button> */}
            </div>
        </div>
      <div className="row hrtable">
        <div className="col-lg-10 col-sm-6 col-md-6">
          <div className="table-responsive tcenter" >
            <table className="table table-bordered table-hover table-sm">
              <thead className="thead-dark">
                <tr>                 
                  <th scope="col"><input type="checkbox" /></th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Status</th>  
                  <th>Action</th>        
                </tr>
              </thead>
                { (data.length > 0) ? data.map( e => {

                  return (
                      
                    <>
                    
                      {e.project.map(item=> {
                      return (
                        <tbody>
                          <tr>
                          <th scope="row">
                            <input type="checkbox"/>
                          </th>
                          <td><ul>{e.clientName}</ul></td>
                          <td><ul>{item.projectName}</ul></td>
                          <td><ul>{item.proStatus}</ul></td>
                          <td>
                          <Link
                              className="btn btn-outline-primary mr-2"
                              to={`/project/edit/${e.clientName}/${item.projectName}`} >
                              Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => delPro(item,e)}>
                            Delete
                         </button>
                         
                        </td>   
                        </tr>
                        </tbody>
                        );
                    })}
                  </>
                  
                  );
                  
                }) : <tr><td colSpan="5">No Records Found</td></tr> }
               
                    

            </table>
            </div> 
          </div>
          </div>
    </>
  );
}

export default ProTable;