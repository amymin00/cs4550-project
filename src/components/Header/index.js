import React from "react";
import {Link} from "react-router-dom";
import Search from "../Search";


const Header = () => {
  return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <h2><a style={{ textDecoration: 'none', color: 'black' }} href="/home">Spotify with Friends</a></h2>
            <form className="d-flex">
              <input className="form-control me-2" type="search"
                     placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success"
                        type="submit">Search
                </button>
            </form>
            <Link to="/login">
              <button className="btn btn-primary float-end">Log in</button>
            </Link>
            {/* if logged in show my profile, otherwise show log in */}
            <Link to="/profile">
              <button className="btn btn-primary float-end">My Profile</button>
            </Link>
          </div>
        </nav>



      </div>
  )
};

export default Header;