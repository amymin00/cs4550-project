import React from "react";
import {Link} from "react-router-dom";
import Search from "../Search";

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid d-flex justify-content-between">
                    <Link to="/" className="text-decoration-none">
                        <h2>Website name</h2>
                    </Link>
                    <Search />
                    <Link to="/login">
                        <button className="btn btn-primary">Log in</button>
                    </Link>
                    {/* if logged in show my profile, otherwise show log in */}
                    <Link to="/profile">
                        <button className="btn btn-primary">My Profile</button>
                    </Link>
                </div>
            </nav>
        </div>
    )
};

export default Header;