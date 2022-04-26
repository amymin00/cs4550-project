import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext';

const SecureMenu = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { checkLoggedIn, logout, profile } = useProfile();
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            try {
                await checkLoggedIn();
                setLoggedIn(true);
            } catch (e) {
                setLoggedIn(false);
            }
        }
        check();
    }, [checkLoggedIn]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (e) {
            console.log(e);
            alert('Unable to logout');
        }
    };

    if (loggedIn) {
        return (
            <>
                <li className="nav-item">
                    <Link to={`/profile/${profile._id}`} className='dropdown-item'>
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <a className='dropdown-item'
                        onClick={handleLogout}>
                            Logout
                    </a>
                </li>
            </>
        );
    } else {
        return (
            <>
                <li className="nav-item">
                    <Link to='/login' className='dropdown-item'>
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/register' className='dropdown-item'>
                        Register
                    </Link>
                </li>
            </>
        );
    }
};

export default SecureMenu;