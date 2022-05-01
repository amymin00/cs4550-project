import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext';
import Loading from '../Loading';
import Header from './header';
import ProfileMain from './profileMain';
import * as userService from '../../services/user-service';
import './style.css';

const Profile = () => {
    const { username } = useParams();
    const { checkLoggedIn } = useProfile();
    const [isThisUser, setIsThisUser] = useState(false);
    const [profileUser, setProfileUser] = useState();

    // Get profile user and currently logged in user
    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                setIsThisUser(user && user.username === username);
            } catch (e) {
                console.log(`Caught error in Profile index.js: ${e}`);
            }
        };
        const getProfileUser = async () => {
            const user = await userService.findUserByUsername(username);
            setProfileUser(user);
        };
        const getUsers = async () => {
            await Promise.all([
                check(),
                getProfileUser()
            ]);
        };
        getUsers();
    }, [checkLoggedIn]);

    if (profileUser) {
        return (
            <div>
                <Header isThisUser={isThisUser} profileUser={profileUser} />
                <hr className='border-2 border-top border-secondary' />
                <ProfileMain isThisUser={isThisUser} profileUser={profileUser} />
            </div>
        );
    } else {
        return <Loading />;
    }
}

export default Profile;