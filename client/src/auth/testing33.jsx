import React from 'react';  
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';  
import axios from 'axios';    
import { useState, useEffect } from 'react'   
import {Link} from 'react-router-dom';

const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  

  container: {  
    maxHeight: 440,  

  },  
});  

  
 const MatPaginationTable =()=> {  

  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  useEffect(() => {    
        const GetData = async () => {    

                const result = await axios('http://localhost:5000/api/clientgetdata');    
                setData(result.data);    
                }  
                GetData();    
                console.log(data);  
        }, []);   
          
  const delData = (row) => {
    console.log(row.clientName)
    var option = window.confirm(`Are you sure to delete ${row.clientName}`)
    if(option){
      console.log(row.id)
      axios.delete(`http://localhost:5000/api/clientdeldata/${row.id}`).then(res => {
        window.location.reload(false);
      })
   }
  }

const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  
  
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  };  

  return (
     <>
    
    <div className="row hrtable">       
    <div className="col-lg-11 col-sm-6 col-md-6">
         <div className="table-responsive tcenter" >
            <table className="table table-bordered table-hover table-sm">      
            <Paper className={classes.root}>  
            <TableContainer className={classes.container}>  
            <Table stickyHeader aria-label="sticky table">      
            <TableHead  className="thead-dark">  
                <TableRow>  
               
                    <TableCell align="right">Clinet Name</TableCell>  
                    <TableCell align="right">Comapny Name</TableCell>  
                    <TableCell align="right">Status</TableCell>  
                    <TableCell align="center">Action</TableCell>  

                </TableRow>  
            </TableHead>  
           
    
        
            <TableBody>  
                {(data.length > 0) ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                return (  
                    <TableRow >  
                    <TableCell align="right">{row.clientName}</TableCell>  
                    <TableCell align="right">{row.companyName}</TableCell>  
                    <TableCell align="right">{row.clientStatus}</TableCell>  
                    <TableCell>
                    <Link
                        className="btn btn-outline-primary mr-2"
                        to={`/client/edit/${row.id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-danger"
                        to={`/client/del/${row.clientName}`}
                      >
                        Delete
                      </Link>
                    </TableCell>
                    </TableRow>             
                    );  
                    }): <tr><td colSpan="5">No Records Found</td></tr>}  


            </TableBody>  
            
            </Table>  
            </TableContainer>
           
             </Paper> 
             </table> 
             <TablePagination  
            rowsPerPageOptions={[5, 10, 15]}  
            component="div"  
            count={data.length}  
            rowsPerPage={rowsPerPage}  
            page={page}  
            onChangePage={handleChangePage}  
            onChangeRowsPerPage={handleChangeRowsPerPage}  
            />  
             </div>
             </div>
             </div>
    </>
  );  

} 
export default MatPaginationTable;


