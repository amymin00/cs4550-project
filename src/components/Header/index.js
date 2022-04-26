import React from 'react';
import Search from './search';
import SecureMenu from './secureMenu';

const Header = () => {

    return (
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <h2><a style={{ textDecoration: 'none', color: 'black' }} href="/home">Spotify with Friends</a></h2>
            <Search />
            <SecureMenu />
          </div>
        </nav>
    );
};

export default Header;