import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

var loginname = '';

class Table extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
          posts:[],
          
        }
      }

    componentDidMount(){
      this.getAll();        
    }

    logindata = (props) => {
      var hasToken = JSON.parse(localStorage.getItem('auth'));
      if (hasToken === null || hasToken === undefined ) {
        return(<Link className="logout" href="/login">Logout</Link>)        
          // props.history.push('/login'); 
      }else{
          var name = hasToken.name;
          loginname = name          
      }
    }   
    

    getAll = () => {
      axios.get('http://localhost:5000/api/clientgetdata')
            .then(response => {
                this.setState({ posts: response.data });
                // console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    createrow = (row) => {

      // eslint-disable-next-line
        let newRowStr = '';
        for (const prop in row) {
          newRowStr += prop + ': ' + row[prop] + ' \n';
        }
        // alert('The new row is:\n ' + newRowStr);        
        console.log(row)
        const obj = {
          id: row.id,
          clientname: row.clientname,
          clientcompanyname: row.clientcompanyname,
          status: row.status
        };
        axios.post('http://localhost:5000/api/clientpostdata', obj)
        .then(res => console.log(res.data));     
    }

    deleterow = (rowKeys, e) => {
      
      var rk = JSON.stringify(rowKeys);
      var keys = rk.match(/\[(.*?)\]/)[1].replace(/(^"|"$)/g, '')      
      // alert('The rowkey you drop: ' + rowKeys);
      axios.delete(`http://localhost:5000/api/clientdeldata/${keys}`).then(res => {
        window.location.reload(false);

        // console.log(res)
        // this.getAll();
      })
    }

    updaterow = (row) => {

      // eslint-disable-next-line
      let newRowStr = '';        
      for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + '\n';
      }
      // alert('Thw whole row :\n' + rowStr);      
        const obj = {
          clientname: row.clientname,
          clientcompanyname: row.clientcompanyname,
          status: row.status
        };
        axios.put(`http://localhost:5000/api/clientupddata/${row.id}`, obj)
        .then(res => 
          console.log("up"));
    }
     
    logout = (props) => {       
      localStorage.removeItem('auth');
    }

  render() {
    
    const cellEditProp = {
      mode: 'dbclick',
      blurToSave: true,
      afterSaveCell: this.updaterow
    };

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true 
    }; 
    this.logindata()
    const status = ['Inactive', 'Active'];

    return (
      <>      
        <div className="hrback">
          <Navbar >
            <Navbar.Brand  className="navbars">Manage Client</Navbar.Brand>
            <Navbar.Toggle />            
            <Navbar.Collapse className="justify-content-end">
            <NavDropdown title="Menu" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Home</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Client</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">Project</NavDropdown.Item>
            </NavDropdown>
              <Navbar.Text>
                Hello: { loginname }          
              </Navbar.Text>
              <Nav.Link className="logout" href="/login" onClick={this.logout}>Logout</Nav.Link>
            </Navbar.Collapse>          
          </Navbar>
        
          <br></br>
          <div className="row hrtable">
            <div className="col-lg-10 ">
              <BootstrapTable
                selectRow={selectRow} 
                data={ this.state.posts } 
                cellEdit={ cellEditProp } 
                options= {{
                  afterInsertRow: this.createrow,
                  afterDeleteRow: this.deleterow,
                  sortIndicator: false, 
                  page: 2,  
                  sizePerPageList: [ {
                    text: '5', value: 5
                  }, {
                    text: '10', value: 10
                  }, {
                    text: 'All', value:this.state.posts.length
                  } ], 
                  sizePerPage: 10,  
                  pageStartIndex: 0, 
                  paginationSize: 3,  
                  prePage: 'Prev', 
                  nextPage: 'Next', 
                  firstPage: 'First', 
                  lastPage: 'Last', 
                  paginationShowsTotal: this.renderShowsTotal,  
                  paginationPosition: 'bottom' 

                }}
                insertRow={true}
                deleteRow={true}
                exportCSV={ true }
                pagination={true}  
                version='4'>

                <TableHeaderColumn  dataField='id' isKey={true} dataSort>Client ID</TableHeaderColumn>
                <TableHeaderColumn  dataField='clientname'>Client Name</TableHeaderColumn>
                <TableHeaderColumn  dataField='clientcompanyname'>Client Company Name</TableHeaderColumn>
                <TableHeaderColumn  dataField='status'  editable={{type:'select' ,options:{values:status}}} dataSort>Status</TableHeaderColumn>      
              </BootstrapTable>
            </div>
          </div>
        </div>

    </>
    );
  }
}
    
export default Table;
