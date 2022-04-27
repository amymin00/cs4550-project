import React from 'react';
import { Link } from 'react-router-dom';
import Search from './search';
import SecureMenu from './secureMenu';

const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3 mb-2">
            <Link to='/' className='navbar-brand mr-5'>
                Spotify with Friends
            </Link>
            <button class="navbar-toggler mb-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav ms-auto'>
                    <Search className='me-5' />
                    <li className='nav-item active me-5'>
                        <Link to='' className='nav-link'>
                            Browse Posts
                        </Link>
                    </li>
                    <li className='nav-item dropdown'>
                        <button className='nav-link active btn btn-light p-1 px-2' id='navbarDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            <span className='text-dark'>Account</span>
                        </button>
                        <SecureMenu />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;