import { toast } from 'react-toastify';
import Logo from '../img/logo.png';
import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
      }
    
      handleSubmit = e => {
        e.preventDefault();
        if(this.props.handleLogin) {
          this.props.handleLogin(this.state);
        }
      };  
      
    onSubmit = (e,props) => {
        e.preventDefault();
        console.log("tri")

        let loginData ={
            email:this.state.email,
            password: this.state.password
        }
                
        axios.post('http://localhost:5000/api/login', loginData).then( res => {
            console.log("clicked")
            localStorage.setItem('auth', JSON.stringify(res.data))
            toast.success("Login Successful");
            let hasToken = JSON.parse(localStorage.getItem('auth')); 
            let empId = hasToken.empId
            console.log(empId)
                

            if (hasToken.role === "admin" && hasToken.token !== null){
                this.props.history.push('/admin');
            }
                
            if (hasToken.role === "hr" && hasToken.token !== null){
                this.props.history.push('/client');
            }
                
            if (hasToken.role === "emp" && hasToken.token !== null){
                this.props.history.push(`/timesheet/${empId}`);
            }
        })
        .catch(err => {                
            toast.error(err.response.data);
            console.log(err.response.data)
        })           
      };
    
      render() {
        return (
      
        <div  className="loginbody">
            <div className="auth-wrapperl">
                <div className="auth-inner"> 
                <form  onSubmit={this.onSubmit}>
                    <div className="logo">
                    <img src={Logo} alt="logo" />
                    </div>
                    <h3 className="tcenter">Altrosyn</h3>
                    <div className="form-group">
                        <label htmlFor="email" className="sr-only">Email </label>
                        <input id="email" type="text" 
                        name="email" 
                        onChange={e => this.setState({ email: e.target.value})}
                        className="form-control" 
                        placeholder="Enter Email"/>                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="sr-only">Password: </label>
                        <input id="password" type="password" 
                            name="password" 
                            onChange={e => this.setState({ password: e.target.value})}
                            className="form-control" 
                            placeholder="Enter Password"/>                            
                    </div>  
                    <button className="btn  btn-primary btn-block" 
                            type="submit">Login</button> 
                    <button className="btn  btn-primary btn-block" onClick={() => {
                            window.location.href = "register";
                        }}>Sign up</button>
        
                </form>
                    </div>
                </div>
            </div>        
        )
      }
}
