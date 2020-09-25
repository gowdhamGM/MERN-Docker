import { toast } from 'react-toastify';
import Logo from '../img/logo.png';
import React, { Component } from 'react'
import axios from 'axios';
import '../index.css'

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
        console.log("triggered")

        let dataa ={
            email:this.state.email,
            password: this.state.password
        }
                
        axios.post('http://localhost:5000/api/login', dataa).then( res => {
            console.log(res)
            // console.log("clicked")
            localStorage.setItem('auth', JSON.stringify(res.data))
            toast.success("Login Successful");
            let hasToken = JSON.parse(localStorage.getItem('auth'));   
            console.log(hasToken)           
                

            if (hasToken.role === "admin" && hasToken.token !== null){
                this.props.history.push('/admin');

            }
                
            if (hasToken.role === "hr" && hasToken.token !== null){
                // return <Redirect to="/" />;
                this.props.history.push('/hrtable');
                // location.href = '/'
            }
                
            if (hasToken.role === "emp" && hasToken.token !== null){
                this.props.history.push('/emp');
            }
            // window.location.reload(false);                
        })
        .catch(err => {                
            toast.error(err.response.data);
            console.log(err)
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
                        // value={email} 
                        className="form-control" 
                        placeholder="Enter Email"/>
                                
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="sr-only">Password: </label>
                            <input id="password" type="password" 
                                name="password" 
                                onChange={e => this.setState({ password: e.target.value})}
                                // value={password}
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
