import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext';

const SecureMenu = () => {
    const [currentUser, setCurrentUser] = useState();
    const [waiting, setWaiting] = useState(true);
    const { checkLoggedIn, logout } = useProfile();
    const navigate = useNavigate();
    
    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                setCurrentUser(user);
                setWaiting(false);
            } catch (e) {
                setWaiting(false);
            }
        }
        check();
    }, []);

    const handleLogoutBtn = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (e) {
            console.log(e);
            alert('Unable to logout');
        }
    };

    if (currentUser) {
        return (
            <>
                <li className="nav-item">
                    <Link to={`/profile/${currentUser._id}`} className='dropdown-item'>
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <button className='dropdown-item'
                        onClick={handleLogoutBtn}>
                            Logout
                    </button>
                </li>
            </>
        );
    } else if (waiting) {
        return null;
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