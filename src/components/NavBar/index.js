import React from 'react';
import { Link } from 'react-router-dom';
import Search from './search';
import SecureMenu from './secureMenu';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 mb-2">
            <Link to='/' className='navbar-brand mr-5'>
                Spotify with Friends
            </Link>
            <button className="navbar-toggler mb-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav ms-auto align-items-center'>
                    <Search className='me-5' />
                    <li className='nav-item dropdown'>
                        <SecureMenu />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;