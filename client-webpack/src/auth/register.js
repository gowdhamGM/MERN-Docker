import React, {Component} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super (props);
        this.state = {username:'', password:'', email:'', empId:'', role:''}
    }

    onSubmit = (e,props) => {
        e.preventDefault();
        // console.log("triggered")
        let registerData ={
            username:this.state.username,
            email: this.state.email,
            password: this.state.password,
            empId: this.state.empId,
            role: this.state.role
        }
        axios.post('http://localhost:5000/api/register', registerData).then( res => {                
                toast.success("Registerd");
                this.props.history.push('/');
            }).catch(err => {
                toast.error(err.response.data)
            })
                    
    }
    render() {
        return (
            <div className="loginbody">
                <div className="auth-wrapper">
                    <div className="auth-inner"> 
                    <form autoComplete="off" onSubmit={this.onSubmit}>
                        <h3>Register</h3>
                        <div className="form-group">
                            <label htmlFor="username" className="sr-only">Username </label>
                            <input type="text" 
                                name="username" 
                                onChange={e => this.setState({ username: e.target.value})}
                                className="form-control" 
                                placeholder="Enter Username"/>
                        </div>

                        <div className="form-group">
                            <label className="sr-only">Email </label>
                            <input type="text" 
                                name="email" 
                                onChange={e => this.setState({ email: e.target.value})}
                                className="form-control" 
                                placeholder="Enter Email"/>
                        </div>

                        <div className="form-group">
                            <label className="sr-only">Password</label>
                            <input type="text" 
                                name="password" 
                                onChange={e => this.setState({ password: e.target.value})}
                                className="form-control" 
                                placeholder="Enter Password"/> 
                        </div>

                        <div className="form-group">
                            <label className="sr-only">EmpId </label>
                            <input type="text" 
                                name="empId" 
                                onChange={e => this.setState({ empId: e.target.value})}
                                className="form-control" 
                                placeholder="Enter EmpId"/>                               
                        </div>

                        <div className="form-group">
                            <label className="sr-only">Role</label>
                            <select 
                                name="role"
                                onChange={e => this.setState({ role: e.target.value})}
                                className="form-control" id="sel1">
                                    <option value="">--Select Role--</option>
                                    <option value="emp">Emp</option>
                                    <option value="hr">Hr</option>
                                    <option value="admin">Admin</option>
                            </select>                               
                         </div>

                        <button className="btn  btn-primary btn-block" 
                                type="submit">Register</button>
                        <button className="btn  btn-primary btn-block" onClick={() => {
                                window.location.href = "login";
                            }}>Login</button> 
                    </form>
                    </div>
                </div>
            </div>
            
        )
    }
}
