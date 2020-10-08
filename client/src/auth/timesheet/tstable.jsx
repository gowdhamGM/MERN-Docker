import React, { useEffect, useState,Fragment} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import TableNavbar from '../__navbar'
import NavBar from '../nav'
import AddTest from './addTest'
import { useHistory,  useRouteMatch } from "react-router-dom";
import TimeSheetTable from './timeSheetTable'
import { makeStyles } from '@material-ui/core/styles';  

const useStyles = makeStyles({  
  color:{
    background:'#D3D3D3'
  }, 
  font:{
    fontSize: '89%'
  }
});  



const TSTable = () => {

  
  const classes = useStyles();  

  let history = useHistory();
  let hasToken = JSON.parse(localStorage.getItem('auth'));
  if (hasToken === null || hasToken === undefined ) {
      history.push('/login'); 
  }else{
      var name = hasToken.name;
      var role = hasToken.role;
      var empId = hasToken.empId;
  }
  const logout = () => {       
      localStorage.removeItem('auth');
      history.push('/login'); 
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

  const d = new Date();
  const [data, setData] = useState([]);
  const [totalDuration, setTotalDuration] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  const [leaveDays, setLeaveDays] = useState([]);
  const [duration, setDuration] = useState("");
  const handleDurationChange = ev => setDuration(ev.target.value);
  
  useEffect(() => {
    loadData();
    loadWokingDay();
    loadLeaveDay(); 
    totalDurations();  
  }, []);
  
  console.log('totalHours',totalDuration[0])


  const loadData = async() => {
    axios.get(`http://localhost:5000/api/timesheetgetdata/${empId}`)
      .then(response => {setData(response.data);
      }).catch(function (error) {
          console.log(error);
      })
  }; 

  const loadWokingDay = async() => {
    axios.get(`http://localhost:5000/api/present/${empId}`)
    .then(response => {setWorkingDays(response.data);
      }).catch(function (error) {
          console.log(error);
      })
  }; 

  const loadLeaveDay = async() => {
    axios.get(`http://localhost:5000/api/absent/${empId}`)
    .then(response => {setLeaveDays(response.data);
      }).catch(function (error) {
          console.log(error);
      })
  }; 

  const totalDurations = async() => {
    axios.get(`http://localhost:5000/api/totalhour/${empId}`)
    .then(response => {setTotalDuration(response.data);
     
      }).catch(function (error) {
          console.log(error);
          
      })
  }; console.log("inside",data)


  const loadDuration = async() => {
    axios.get(`http://localhost:5000/api/tsheet/${empId}/${duration}`)
      .then(response => {setData(response.data); 
      }).catch(function (error) {
          console.log(error);
      })
   
  }; 

console.log("Present",workingDays.length)
console.log("leave",leaveDays.length)
  
 
  return (
    <>
    
   <NavBar/>  
    <div className={classes.font}>
      <div className="m-4 pb-3">
      <div className="m-5 pb-3">
      <div className="Container">
          <div className="col-lg-12">         
            <div className="row justify-content-md-center">
              <div className="col-lg-6">
                  <br></br>
                  <br></br>
                  <h3>Manage Timesheet</h3>
              </div>
              <div className="col-lg-6">
                <br></br>
                <p className="text-right">
                  <button type="button" class="btn btn-primary" onClick={logout}>Logout</button>
                </p>
                <br></br>
                <br></br> 
              </div>
            </div>         
          </div>
        <div className="col-lg-12">       
        <div className="  card ">
          <div className="card-body">  
          <div className="row">          
          </div>
          <div className="row">
            <div className="col-md-2">
              <p>Name :</p>
            </div>
            <div className="col-md-4">
              <p>{name}</p>
            </div> 
            <div className="col-md-2">

            <tbody>
                {  data.map( (droplet, index) => {
                  return (
                      <p>{ droplet.clientName1 }</p>                            
                  )
                })}
               
                    
              </tbody>
            </div>
            <div className="col-md-2">
              <p></p>
            </div>
            <div>
              <p></p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <p>Month :</p>
            </div>
            <div className="col-md-4">
              <p>{ monthNames[d.getMonth()]}</p>
            </div> 
          </div>

          <div className="row">
            <div className="col-md-2">
              <p>Duration Worked :</p>
            </div>
            <div className="col-md-4">
            {  totalDuration.map( (e, index) => {
                  return (
                      <p>{  (`0${e.totalduration / 60 ^ 0}`.slice(-2) + 'Hrs:' + ('0' + e.totalduration % 60).slice(-2) +'Mins')}</p>             
                  )
                })}
            </div> 
          </div>
          <div className="row">
            <div className="col-md-2">
              <p>Working Days :</p>
            </div>
            <div className="col-md-4">
               <p>{workingDays.length}</p>
            </div> 
          </div>
          <div className="row">
            <div className="col-md-2">
              <p>Leave Days :</p>
            </div>
            <div className="col-md-4">
              <p>{leaveDays.length}</p>
            </div> 
          </div>       
          </div>
        </div>
        </div>
        <br></br> 
        <br></br>
        <div className="col-lg-12"> 
        <div className="row">
        <div className="col-lg-1">
        Search  : 
        </div>
        <div className="col-lg-2">
            <input
                type="month"
                name="duration"
                className="form-control form-control-md"
                placeholder="Duration"
                value={duration || ""}
                onChange={handleDurationChange}
                isInvalid={!duration}
                />               
            </div> 
            <div className="col-md-2">
              <button className="btn btn-success btn-md" onClick={loadDuration}>Find</button>
            </div>
            <div className="col-md-6">
            <p className="text-right">
              <Fragment>
                <AddTest empId={empId} empName={name}/>  
              </Fragment>
              </p>
             </div> 
        </div>        
       </div>
      <br></br> 

        <div className="bottomContainer">
          <Fragment>
          <TimeSheetTable data={data}/>
          </Fragment>
  
        </div>
        </div>       
      </div>
      </div>
      </div>
  
     
       
    </>
  );
}

export default TSTable;