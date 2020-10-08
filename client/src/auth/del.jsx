import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory,  useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AlertDelete=({id})=> {
    console.log('im Id',id)

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {        
                loadData();      
                },
            []); 

const loadData = async() => {
    const result = await axios.get(`http://localhost:5000/api/clientgetdata/${id}`)
    setData(result.data);
    console.log("This",result.data)    
};
const deleteClient = () => {
    axios.delete(`http://localhost:5000/api/clientdeldata/${id}`)
    window.location.reload(false);

};


  return (
    <div>
        <h onClick={handleClickOpen}>Delect</h>     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete client:"}</DialogTitle>
        <DialogContent>
                <p>Are you sure you want to delete client ? client have these projects:</p>
                <> 
                 {
                    data.map(event => {
                        return(
                        <>
                        {
                            event.project.map(item=>{
                         
                            return( 
                                <p className="text-center"> <li>{item.projectName}</li> </p>                      
                            )
                            })}
                            </>
                            )
                        } 
                        )
                 }      
                  </> 
                       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={deleteClient} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDelete;