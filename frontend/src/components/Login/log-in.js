import React from "react";
import {Link} from "react-router-dom";

const Login = () => {

  return (
      <div className="container mt-5">
        {/*https://mdbootstrap.com/docs/standard/extended/login/*/}
        <h1 className="text-center text-primary mb-5">Log in</h1>
        <form>
              <div className="form-outline mb-4">
                <input type="email" id="loginName" className="form-control" />
                <label className="form-label">Email or username</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="loginPassword" className="form-control" />
                <label className="form-label">Password</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

              <div className="text-center">
                <p>Not a member? <Link to="/register">Register</Link></p>
              </div>
            </form>
          </div>
  )
};

export default Login;