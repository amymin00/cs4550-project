import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/profileContext";
import refreshPage from "../../utils/refreshPage";
import validName from "../../utils/validName";

const Login = () => {
    const { login } = useProfile();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        
        try {
            await login(usernameRef.current.value, passwordRef.current.value);
            navigate(-1);
            refreshPage();
        } catch (e) {
            alert('Unable to login with given user credentials');
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center text-primary mb-5">Log in</h1>
            <form onSubmit={handleLogin}>
                {/* username */}
                <div className="form-outline mb-4">
                    <input required
                            ref={usernameRef}
                            type="text" id="loginName"
                            className="form-control"
                            placeholder="johnsmith"/>
                    <label className="form-label">Username</label>
                </div>

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
                        className="btn btn-primary btn-block mb-4">
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