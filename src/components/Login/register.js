import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/profileContext";

const Register = () => {
    const { register } = useProfile();
    const nameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const userTypeRef = useRef();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const user = {
                name: nameRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                creator: userTypeRef.current.value,
            };
            await register(user);
            navigate('/');
        } catch (e) {
            alert('Unable to sign up with given user credentials. Try again');
        }
    };

    return (
        <div>
            <div className="container mt-3">
                <h1 className="text-center text-primary mb-5">Register</h1>
                <form action="/home">
                    {/* name */}
                    <div className="form-outline mb-4">
                        <input required 
                                ref={nameRef}
                                type="text" id="registerName" 
                                className="form-control"
                                placeholder="John Smith" />
                        <label className="form-label" htmlFor="registerName">Name</label>
                    </div>

                    {/* username */}
                    <div className="form-outline mb-4">
                        <input required
                                ref={usernameRef}
                                type="text" id="registerUsername" 
                                className="form-control"
                                placeholder="johnsmith" />
                        <label className="form-label"
                                htmlFor="registerUsername">Username</label>
                    </div>

                    {/* password */}
                    <div className="form-outline mb-4">
                        <input required
                                ref={passwordRef}
                                type="password" 
                                id="registerPassword"
                                placeholder="password"
                                className="form-control" />
                        <label className="form-label"
                                htmlFor="registerPassword">Password</label>
                    </div>

                    {/* user type */}
                    <div className="form-outline mb-4">
                        <select required
                                ref={userTypeRef}
                                className="form-select"
                                defaultValue={'DEFAULT'}>
                            <option value='DEFAULT' disabled>Select account type</option>
                            <option value={false}>Listener</option>
                            <option value={true}>Artist</option>
                        </select>
                    </div>

                    <button type="submit"
                            className="btn btn-primary btn-block mb-3"
                            onClick={handleSignUp}>
                        Register
                    </button>

                    <div className="text-center">
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;