import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteUser} from '../../actions/user-actions';

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
        followees: [],
    }
}) => {
  const dispatch = useDispatch();
  return (
        <ul className='list-group-item'>
            <Link to={`/profile/${user._id}`}
                  className='row align-items-center text-dark'>
                <div className='col w-auto'>
                    <span className='d-inline-block align-middle'>
                        <span className='d-inline-block pe-5'>
                            <p className='fw-bold mb-0'>{user.name}
                            {user.creator && <i className='fa fa-check-circle'/>}
                            </p>
                        </span>
                        <span className='d-inline'>
                            <p className=' mb-0'>@{user.username}</p>
                        </span>
                    </span>
                    </div>
                <div className='col w-auto'>
                    {/* TODO unfollow functionality */}
                    <button className='btn btn-danger rounded-pill'
                            onClick={() => deleteUser(
                                dispatch, user)}>
                        Remove
                    </button>
                </div>
            </Link>
        </ul>
  );
}
export default ListOfUsersItem;