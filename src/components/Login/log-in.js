import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/profileContext";

const Login = () => {
    const { login } = useProfile();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        try {
            await login(usernameRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (e) {
            console.log(e);
            alert('Unable to login with given user credentials');
        }
    };

    return (
<<<<<<< Updated upstream
        <div className="container mt-3">
            <h1 className="text-center text-primary mb-5">Log in</h1>
            <form>
                {/* username */}
                <div className="form-outline mb-4">
                    <input required
                            ref={usernameRef}
                            type="text" id="loginName"
                            className="form-control"
                            placeholder="johnsmith"/>
                    <label className="form-label">Username</label>
                </div>
=======
        <div>
            {/* <div className="d-inline-block mt-2">
                <Link to="/home">
                    <button className="btn btn-primary float-end">Home</button>
                </Link>
            </div> */}
            <div className="container mt-3">
                {/*https://mdbootstrap.com/docs/standard/extended/login/*/}
                <h1 className="text-center text-primary mb-5">Log in</h1>
                <form>
                    <div className="form-outline mb-4">
                    <input type="text" id="loginName" className="form-control"
                            placeholder="johnsmith@webdev.com"/>
                    <label className="form-label">Email or username</label>
                    </div>
>>>>>>> Stashed changes

                {/* password */}
                <div className="form-outline mb-4">
                    <input required
                        ref={passwordRef}
                        type="password" id="loginPassword" 
                        className="form-control"
                        placeholder="password"/>
                    <label className="form-label">Password</label>
                </div>

                <button type="submit"
                        className="btn btn-primary btn-block mb-4"
                        onClick={handleLogin}>
                    Login
                </button>

                <div className="text-center">
                    <p>Not a member? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    )
};

export default Login;