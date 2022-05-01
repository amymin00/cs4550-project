import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext';
import refreshPage from '../../utils/refreshPage';

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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            refreshPage();
        } catch (e) {
            alert('Unable to logout');
        }
    };

    return (
        <>
            <button className='nav-link active btn btn-info p-1 px-2 mt-lg-0 mt-2' id='navbarDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                <span className='text-white-50'>
                    {(currentUser && currentUser.username) ||
                     (!currentUser && 'Join us')}
                </span>
            </button>
            <ul className='dropdown-menu dropdown-menu-end'
                style={{minWidth: '1rem'}} 
                aria-labelledby='navbarDropdown'>
                {
                    (currentUser &&
                        <>
                            <Link to={`/profile/${currentUser.username}`} className='dropdown-item'>
                                Profile
                            </Link>
                            <hr className="dropdown-divider"></hr>
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
                            <Link to='/register' className='dropdown-item'>
                                Register
                            </Link>
                            <Link to='/login' className='dropdown-item'>
                                Login
                            </Link>
                        </>
                    )
                }
            </ul>
        </>
    );
};

export default SecureMenu;