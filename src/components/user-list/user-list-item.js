import { Link } from 'react-router-dom';
import FollowButton from '../../FollowButton';
import { useProfile } from '../../contexts/profileContext';
import { useEffect, useState } from 'react';

const ListOfUsersItem = ({
    user = {
        _id: '0',
        name: 'bill',
        username: 'bill-webdev',
        password: 'p@ssword',
        creator: false,
        biography: 'hello',
        image: '',
        songs: [],
        playlists: [],
        followers: [],
        following: [],
    }
}) => {
    const { checkLoggedIn } = useProfile();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [thisUser, setThisUser] = useState();

    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                if (user) {
                    setIsLoggedIn(true);
                    setThisUser(user);
                }
            } catch (e) {
                console.log(`Caught error in user-list-item.js: ${e}`);
            }
        };
        check();
    }, []);
    
    return (
        <ul className='list-group-item row d-flex justify-content-between'>
            <Link to={`/profile/${user.username}`}
                className='col align-items-center text-dark px-md-1 w-auto text-decoration-none'>
                <span className='text-wrap'>
                    <p className='fw-bold mb-0'>{user.name}
                    {user.creator && <i className='fa fa-check-circle ms-2'/>}
                    </p>
                </span>
                <span className='text-wrap'>
                    <p className=' mb-0'>@{user.username}</p>
                </span>
            </Link>
            <div className='col p-0 mt-md-2 w-auto'>
                <FollowButton user={user} className='float-xl-end float-none' />
            </div>
        </ul>
    );
}
export default ListOfUsersItem;