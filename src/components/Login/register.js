import React from "react";
import {Link} from "react-router-dom";

const Register = ({
  user = {
    type: "listener" // default
  }
}) => {

  const setUserType = () => {
    console.log(user.type);
    if (user.type === "artist") {
      user.type = "listener";
    } else {
      user.type = "artist";
    }
    console.log(user.type);
  };

  return (
      <div>
        <div className="d-inline-block mt-2">
          <Link to="/home">
            <button className="btn btn-primary float-end">Home</button>
          </Link>
        </div>
        <div className="container mt-3">
          {/*https://mdbootstrap.com/docs/standard/extended/login/*/}
          <h1 className="text-center text-primary mb-5">Register</h1>
          <form>
            <div className="form-outline mb-4">
              <input type="text" id="registerName" className="form-control"
                     placeholder="John Smith"/>
              <label className="form-label" htmlFor="registerName">Name</label>
            </div>

            <div className="form-outline mb-4">
              <input type="text" id="registerUsername" className="form-control"
                     placeholder="johnsmith"/>
              <label className="form-label"
                     htmlFor="registerUsername">Username</label>
            </div>

            <div className="form-outline mb-4">
              <input type="email" id="registerEmail" className="form-control"
                     placeholder="johnsmith@webdev.com"/>
              <label className="form-label"
                     htmlFor="registerEmail">Email</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="registerPassword"
                     placeholder="password"
                     className="form-control"/>
              <label className="form-label"
                     htmlFor="registerPassword">Password</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="registerRepeatPassword"
                     placeholder="password"
                     className="form-control"/>
              <label className="form-label" htmlFor="registerRepeatPassword">Repeat
                password</label>
            </div>

            {/*TODO implement reducer, update this with reducer*/}
            <div className="form-outline mb-4">
              <label>
                Register as an artist
                <input
                    className="ms-2"
                    name="isArtist"
                    type="checkbox"
                    checked={user.type === "artist"}
                    onChange={() => setUserType()}/>
              </label>
            </div>

            <button type="submit"
                    className="btn btn-primary btn-block mb-3">Register
            </button>

            <div className="text-center">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
  )
};

export default Register