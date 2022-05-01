import { Link } from 'react-router-dom';
import FollowButton from '../FollowButton';
import refreshPage from '../../utils/refreshPage';

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
    
    return (
        <ul className='list-group-item row d-flex justify-content-between'>
            <Link to={`/profile/${user.username}`}
                onClick={refreshPage}
                className='col-9 align-items-center text-dark px-md-1 text-decoration-none w-auto'>
                <span className='text-wrap'>
                    <p className='fw-bold mb-0 text-nowrap'>
                        {user.name}
                        {user.creator && <i className='fa fa-check-circle ms-2'/>}
                    </p>
                </span>
                <span className='text-wrap'>
                    <p className=' mb-0'>@{user.username}</p>
                </span>
            </Link>
            <div className='col-3 p-0 mt-md-2 w-auto d-flex'>
                <FollowButton user={user} className='float-end' />
            </div>
        </ul>
    );
}
export default ListOfUsersItem;