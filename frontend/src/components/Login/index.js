import React from "react";

const Login = () => {
  return (
      <div className="container">
        {/*https://mdbootstrap.com/docs/standard/extended/login/*/}
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
               aria-controls="pills-login" aria-selected="true">Login</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
               aria-controls="pills-register" aria-selected="false">Register</a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>

              <p className="text-center">or:</p>

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
          <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>

              <p className="text-center">or:</p>

              <div className="form-outline mb-4">
                <input type="text" id="registerName" className="form-control" />
                <label className="form-label" for="registerName">Name</label>
              </div>

              <div className="form-outline mb-4">
                <input type="text" id="registerUsername" className="form-control" />
                <label className="form-label" for="registerUsername">Username</label>
              </div>

              <div className="form-outline mb-4">
                <input type="email" id="registerEmail" className="form-control" />
                <label className="form-label" for="registerEmail">Email</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="registerPassword" className="form-control" />
                <label className="form-label" for="registerPassword">Password</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="registerRepeatPassword" className="form-control" />
                <label className="form-label" for="registerRepeatPassword">Repeat password</label>
              </div>

              <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                       aria-describedby="registerCheckHelpText" />
                <label className="form-check-label" for="registerCheck">
                  I have read and agree to the terms
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
            </form>
          </div>
        </div>
      </div>


  )
};

export default Login;