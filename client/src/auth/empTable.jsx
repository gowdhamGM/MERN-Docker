import React, { useEffect, useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import TableNavbar from './__navbar'
import {Link} from 'react-router-dom';

const EmpTable = () => {
  
  const [data, setData] = useState([]); 
  useEffect(() => {
    loadData();
   
  }, []); 



  const loadData = async() => {
    axios.get('http://localhost:5000/api/usergetdata/emp')
      .then(response => {
        setData(response.data.map(d => {
          return{
            select: false,
            id: d._id,
            empId:d.empId,
            userName : d.userName,
            email: d.email,
            role: d.role
            
          }
        }));
      
      }).catch(function (error) {
          console.log(error);
      })

  }
  
  const delData = (droplet) => {
    var option = window.confirm(`Are you sure to delete ${droplet.userName}`)
    if(option){
      axios.delete(`http://localhost:5000/api/empdeldata/${droplet.id}`).then(res => {
        window.location.reload(false);
      })
   }
  }
    
  return (
    <>
      <TableNavbar />
      <div className="row addButton">
            <div className="col-lg-1">
            <Link
                className="btn btn-outline-primary mr-2"
                to={'/employee/add'}
              >New</Link>
            </div>
            <div className="col-lg-1">
            </div>
        </div>
      <div className="row hrtable">
        <div className="col-lg-10 col-sm-6 col-md-6">
          <div className="table-responsive tcenter" >
            <table className="table table-bordered table-hover table-sm">
              <thead className="thead-dark">
                <tr>                 
                  <th scope="col"><input type="checkbox" /></th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>   
                  <th>Action</th>        
                </tr>
              </thead>
              <tbody>
                { (data.length > 0) ? data.map( (droplet, index) => {
                  return (
                    <tr key={ droplet.id }>
                      <td><input type="checkbox"/></td>
                      <td>{ droplet.empId }</td>
                      <td>{ droplet.userName }</td>
                      <td>{ droplet.email}</td>
                      <td>{ droplet.role }</td>    
                      <td>
                      <Link
                        className="btn btn-outline-primary mr-2"
                        to={`/employee/edit/${droplet.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => delData(droplet)}
                      >
                        Delete
                      </button>
                        </td>                
                    </tr>                    
                  )
                }) : <tr><td colSpan="5">No Records Found</td></tr> }
               
                    
              </tbody>
            </table>
            </div> 
          </div>
          </div>
    </>
  );
}

export default EmpTable;