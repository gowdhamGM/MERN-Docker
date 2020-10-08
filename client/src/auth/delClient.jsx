import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './delClient.css'
import { useHistory,  useRouteMatch } from "react-router-dom";


const DelClient = () =>{
    let history = useHistory();
    const match = useRouteMatch('/client/del/:id')
    const id = match.params.id;
    //const clientid = match.params.clientid
    const [data, setData] = useState([]);
    
    console.log("data",data)
    useEffect(() => {        
        loadData();      
    },
    []);

    const loadData = async() => {
        const result = await axios.get(`http://localhost:5000/api/clientgetdata/${id}`)
        setData(result.data);
        console.log("This",result.data)    
    };

    const cancelDel =()=>{
      history.push(`/client`)
    };
    
    const onClick = () => {
        axios.delete(`http://localhost:5000/api/clientdeldata/${id}`)
        history.push('/client')
        window.location.reload(false);

    };
    return(
        
       

<body>


    <div className="container">
     <div class="col-xs-1 center-block">    
      <div className="card">
        <div className="card-header">
          <h1>Delete Client</h1>
          <h5>Are you sure you want to delete client ?</h5>
          <h5>client have these projects</h5>
        </div>
      <>
            {
          data.map(event => {
              return(
                  <>
                  {event.project.map(item=>{
                      console.log(item)
                      return( 
                            <p className="text-center"> <li>{item.projectName}</li> </p>                      
                        )
                  })}
                  </>
              )
            } 
          )
      }      
      <div className="clearfix">
        <button onClick={() => cancelDel()} className="btn btn-outline-primary mr-2" >Cancel</button>
        <button onClick={() => onClick()}  className="btn btn-danger">Delete</button>
      </div>    
      </>    
    </div>
    </div>
    </div>
    </body>
    )
}
export default DelClient;