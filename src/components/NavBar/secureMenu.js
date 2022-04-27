import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext';
import Search from './search';

const SecureMenu = ({outerClassName = ''}) => {
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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (e) {
            console.log(e);
            alert('Unable to logout');
        }
    };

    return (
        <ul className='dropdown-menu dropdown-menu-end'
            style={{minWidth: '1rem'}} 
            aria-labelledby='navbarDropdown'>
            {
                (currentUser &&
                    <>
                        <Link to={`/profile/${currentUser.username}`} className='dropdown-item'>
                            Profile
                        </Link>
                        <hr class="dropdown-divider"></hr>
                        <div className='dropdown-item' 
                             onClick={handleLogout}
                             type='button'>
                            Logout
                        </div>
                    </>
                ) ||
                (waiting && <></>) ||
                (!currentUser && !waiting &&
                    <>
                        <Link to={`/profile/${currentUser.username}`} className='dropdown-item'>
                            Login
                        </Link>
                        <Link to='/register' className='dropdown-item'>
                            Register
                        </Link>
                    </>
                )
            }
        </ul>
    );
};

export default SecureMenu;