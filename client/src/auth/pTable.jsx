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
  tablecell: {
    fontSize: '100%'
},  
}); 

const PTable =()=> { 
        const classes = useStyles();  
        const [page, setPage] = React.useState(0);  
        const [data, setData] = useState([]);   
        const [rowsPerPage , setRowsPerPage] = React.useState(5);  
        const handleChangePage = (event, newPage) => {  
        setPage(newPage);  
        };    
        const handleChangeRowsPerPage = event => {  
        setRowsPerPage(+event.target.value);  
        setPage(0);  
        }; 
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
            window.location.reload(false)
            })
        }
        }

    return(
        <>
        <div className="row hrtable">       
        <div className="col-lg-10 col-sm-6 col-md-6">
             <div className="table-responsive tcenter" >
                <table className="table table-bordered table-hover table-sm">      
                <Paper className={classes.root}>  
                <TableContainer className={classes.container}>  
                <Table  stickyHeader aria-label="sticky table">      
                <TableHead  className="thead-dark">  
                    <TableRow>  
                   
                        <TableCell className={classes.tablecell} align="right">ClientName</TableCell>  
                        <TableCell className={classes.tablecell} align="right">ProjectName</TableCell>
                        <TableCell className={classes.tablecell} align="center">Status</TableCell>     
                        <TableCell className={classes.tablecell} align="center">Action</TableCell>  
    
                    </TableRow>  
                </TableHead>  
               
        
            
                <TableBody>  
                    {(data.length > 0) ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                    return (  
                  
                            row.project.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row2 => {
                        
                            return(
                                <TableRow >  
                                    <TableCell className={classes.tablecell}align="right"><ul>{row.clientName}</ul></TableCell> 
                                    <TableCell className={classes.tablecell} align="right"><ul>{row2.projectName}</ul></TableCell> 
                                    <TableCell className={classes.tablecell} align="right"><ul> {row2.proStatus}</ul></TableCell> 
                                    <TableCell>
                                    <Link
                                        className="btn btn-outline-primary mr-2"
                                        to={`/project/edit/${row.clientName}/${row2.projectName}`} 
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        className="btn btn-danger"
                                        onClick={() => delPro(row,row2)}
                                    >
                                        Delete
                                    </Link>
                                    </TableCell>
                            </TableRow>             
                                
                            )
                            
                        }
                        )
                                  
                        );  

                        }): <tr><td colSpan="7">No Records Found</td></tr>}  
    
    
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
    )



}
export default PTable;