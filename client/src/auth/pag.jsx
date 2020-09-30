import React, { useState,useEffect }   from 'react';
import axios from 'axios'
import 'bulma/css/bulma.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import TableNavbar from './__navbar'

const Pagination = () => {
  
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
            companyName: d.companyName,
            clientStatus: d.clientStatus
          }
        }));
        
      
      }).catch(function (error) {
          console.log(error);
      })
   
  }    
  

  const itemsPerPage = 5
  const startFrom =1
  const perPage = itemsPerPage ? itemsPerPage : 10;
  const pages = Math.ceil(data.length / perPage);
  const pagination = [];
  const [currentPage, setCurrentPage] = useState(startFrom <= pages ? startFrom : 1);
  const [slicedData, setSlicedData] = useState([...data].slice((currentPage - 1) * perPage, currentPage * perPage));

  let ellipsisLeft = false;
  let ellipsisRight = false;

    for(let i = 1; i <= pages; i++) {
      if(i === currentPage) {
        pagination.push(
          { id: i, current: true, ellipsis: false }
        );
      }else {
        if(i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1) {
          pagination.push(
            { id: i, current: false, ellipsis: false }
          );
        }else if(i > 1 && i < currentPage && !ellipsisLeft) {
          pagination.push(
            { id: i, current: false, ellipsis: true }
          );
          ellipsisLeft = true;
        }else if(i < pages && i > currentPage && !ellipsisRight) {
          pagination.push(
            { id: i, current: false, ellipsis: true }
          );
          ellipsisRight = true;
        }
      }
    }
  
    const changePage = (page, e) => {
      e.preventDefault();
      if(page !== currentPage) {
        setCurrentPage(page);
        setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
      }
    }
  
    const goToPrevPage = (e) => {
      e.preventDefault();
      setCurrentPage(prevVal => prevVal - 1 === 0 ? prevVal : prevVal - 1);
      if(currentPage !== 1) {
        setSlicedData([...data].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
      }
    }
  
    const goToNextPage = (e) => {
      e.preventDefault();
      setCurrentPage(prevVal => prevVal === pages ? prevVal : prevVal + 1);
      if(currentPage !== pages) {
        setSlicedData([...data].slice(currentPage * perPage, (currentPage + 1) * perPage));
        
      }
    }
  
    var  prevPage =goToPrevPage
    var nextPage= goToNextPage

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
          <nav className="pagination">
          <a href="/#" className="pagination-previous" onClick={prevPage}>Previous</a>
          <a href="/#" className="pagination-next" onClick={nextPage}>Next</a>
          <ul className="pagination-list">
            {pagination.map(page => {
                if(!page.ellipsis) {
                  return <li key={page.id}>
                    <a 
                      href="/#"
                      className={page.current ? 'pagination-link is-current' : 'pagination-link'}
                      onClick={(e) => changePage(page.id, e)}
                    >
                      {page.id}
                    </a>
                  </li>
                }else {
                  return <li key={page.id}><span className="pagination-ellipsis">&hellip;</span></li>
                }
            })}
          </ul>
        </nav>
       
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
                  { (slicedData.length > 0) ? slicedData.map( (droplet, index) => {
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

export default Pagination;


