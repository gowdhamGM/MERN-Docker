import React, { useEffect, useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import TableNavbar from './__navbar'
import {Link} from 'react-router-dom';

const Table = () => {
  
  const [data, setData] = useState([]); 
  // var dip = [];

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
            companyName: d.companyName,
            clientStatus: d.clientStatus
          }
        }));
        
      
      }).catch(function (error) {
          console.log(error);
      })
   
  }   
  
  const delData = (droplet) => {
    console.log(droplet.clientName)
    var option = window.confirm(`Are you sure to delete ${droplet.clientName}`)
    if(option){
      console.log(droplet.id)
      axios.delete(`http://localhost:5000/api/clientdeldata/${droplet.id}`).then(res => {
        window.location.reload(false);
      })
   }
  }

  
    
  return (
    <>
      <TableNavbar />
      <div className="row addButton">
            <div className="col-lg-1" >
            <Link
                className="btn btn-outline-primary mr-2"
                to={'/client/add'}
              >New</Link>
            </div>            
        </div>
      <div className="row hrtable">
        <div className="col-lg-10 col-sm-6 col-md-6">
          <div className="table-responsive tcenter" >
            <table className="table table-bordered table-hover table-sm">
              <thead className="thead-dark">
                <tr>                 
                  <th scope="col"><input type="checkbox" /></th>
                  {/* <th scope="col">Client ID</th> */}
                  <th scope="col">Client Name</th>
                  <th scope="col">Client Company Name</th>
                  <th scope="col">Status</th>  
                  {/* {<th scope="col">Taskname</th>  } */}
                  <th>Action</th>        
                </tr>
              </thead>
              <tbody>
                { (data.length > 0) ? data.map( (droplet, index) => {
                  return (
                    <tr key={ droplet.id }>
                      <th scope="row">
                        <input type="checkbox"/>
                      </th>
                      <td>{ droplet.clientName }</td>
                      <td>{ droplet.companyName}</td>
                      <td>{ droplet.clientStatus }</td>    
                      <td>
                      <Link
                        className="btn btn-outline-primary mr-2"
                        to={`/client/edit/${droplet.id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-danger"
                        //onClick={() => delData(droplet)}
                        to={`/client/del/${droplet.clientName}`}
                      >
                        Delete
                      </Link>
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

export default Table;