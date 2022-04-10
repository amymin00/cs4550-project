import React from "react";
import {Link} from "react-router-dom";

const Register = () => {

  return (
      <div className="container mt-5">
        {/*https://mdbootstrap.com/docs/standard/extended/login/*/}
        <h1 className="text-center text-primary mb-5">Register</h1>
        <form>
          <div className="form-outline mb-4">
            <input type="text" id="registerName" className="form-control"/>
            <label className="form-label" htmlFor="registerName">Name</label>
          </div>

          <div className="form-outline mb-4">
            <input type="text" id="registerUsername" className="form-control"/>
            <label className="form-label"
                   htmlFor="registerUsername">Username</label>
          </div>

          <div className="form-outline mb-4">
            <input type="email" id="registerEmail" className="form-control"/>
            <label className="form-label" htmlFor="registerEmail">Email</label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" id="registerPassword"
                   className="form-control"/>
            <label className="form-label"
                   htmlFor="registerPassword">Password</label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" id="registerRepeatPassword"
                   className="form-control"/>
            <label className="form-label" htmlFor="registerRepeatPassword">Repeat
              password</label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3">Register</button>

          <div className="text-center">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </form>
      </div>
  )
};

export default Register