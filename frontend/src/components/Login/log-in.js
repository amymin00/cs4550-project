import React from "react";

const Login = () => {

  return (
      <div className="container mt-5">
        {/*https://mdbootstrap.com/docs/standard/extended/login/*/}
        <h1 className="text-center text-primary mb-5">Log in</h1>
        <form>
              <div className="form-outline mb-4">
                <input type="email" id="loginName" className="form-control" />
                <label className="form-label" for="loginName">Email or username</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="loginPassword" className="form-control" />
                <label className="form-label" for="loginPassword">Password</label>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="form-check mb-3 mb-md-0">
                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                    <label className="form-check-label" for="loginCheck"> Remember me </label>
                  </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

              <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
              </div>
            </form>
          </div>
  )
};

export default Login;