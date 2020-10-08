import React from 'react';
import {Link} from 'react-router-dom'
import Logo from './logo.png';


const Login1 = () => {
  return (
    <div
      className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="login-content">
        <div className="login-header">
          <Link className="app-logo" to="/" title="Jambo">
            <img src={Logo} alt="jambo" title="jambo"/>
          </Link>
        </div>

        <div className="login-form">
          <form>
            <fieldset>
              <div className="form-group">
                <input name="email" id="email" className="form-control form-control-lg"
                       placeholder="Email" type="email"/>
              </div>
              <div className="form-group">
                <input name="password" id="password" className="form-control form-control-lg"
                       placeholder="Password" type="password"/>
              </div>
              <div className="form-group d-flex justify-content-between align-items-center">
                <label className="custom-control custom-checkbox float-left pl-0">
                  <input type="checkbox" className="custom-control-input"/>
                  <span className="custom-control-indicator"/>
                  <span className="custom-control-description">Remember me</span>
                </label>

                <div>
                  <Link to="/app/app-module/forgot-password-1"
                        title="Reset Password"></Link>
                </div>
              </div>

              <Link to="/" className="btn jr-btn-rounded btn-primary btn-rounded"></Link>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login1;
