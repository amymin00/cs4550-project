import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import SecureMenu from './secureMenu';

const Header = () => {

    return (
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <h2><a style={{ textDecoration: 'none', color: 'black' }} href="/home">Spotify with Friends</a></h2>
            <form className="d-flex">
              <input className="form-control me-2" type="search"
                     placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success"
                        type="submit">
                    Search
                </button>
            </form>
            <SecureMenu />
          </div>
        </nav>
    );
};

export default Header;