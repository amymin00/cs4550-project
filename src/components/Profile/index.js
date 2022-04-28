import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext';
import ListOfPostsItem from '../Posts/list-of-post-item';
import UserList from '../user-list';
import SongItem from '../SongListItem';
import Loading from '../Loading';
import FollowButton from '../../FollowButton';
import * as userService from '../../services/user-service';
import * as songService from '../../services/song-service';

/**
 * TODOS:
 * 1. Find out how to get profile for anyone
 * 2. get posts/comments made by this user
 * 3. get this user's songs
 */


const Profile = () => {
    const { username } = useParams();
    const { checkLoggedIn } = useProfile();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [thisUser, setThisUser] = useState();
    const [isThisUser, setIsThisUser] = useState(false);
    const [profileUser, setProfileUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [usersSongs, setUsersSongs] = useState([]);

    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                if (user) {
                    setIsLoggedIn(true);
                    setThisUser(user);
                }
                if (user && user.username === username) {
                    setIsThisUser(true);
                }
            } catch (e) {
                console.log(`Caught error in Profile index.js: ${e}`);
            }
        };
        const getProfileUser = async () => {
            const user = await userService.findUserByUsername(username);
            setProfileUser(user);
        }
        check();
        getProfileUser();
    }, []);

    useEffect(() => {
        const findUsersFollowers = async () => {
            const followers = await userService.findUsersFollowers(profileUser);
            setFollowers(followers);
        };
        const findUsersFollowing = async () => {
            // console.log('in findUsersFollowing');
            const following = await userService.findUsersFollowing(profileUser);
            // console.log(`user following ppl #: ${following.length}`);
            setFollowing(following);
        };
        const findUsersSongs = async () => {
            const songs = await songService.findSongsById(profileUser.songs);
            setUsersSongs(songs);
        }
        findUsersFollowers();
        findUsersFollowing();
        findUsersSongs();
    }, [profileUser]);

    if (profileUser) {
        return (
            <div>
                <div id='profile-header'>
                    <div className='row justify-content-between align-items-center'>
                        <h5 className='w-auto'>
                            <span className='h1'><strong>{profileUser.name}</strong></span>
                            <span className='text-secondary profile-username'>
                                &nbsp; {profileUser.username} {profileUser.creator && <i className='fa fa-check-circle fa-xs'/>}
                            </span>
                        </h5>
                        {
                            (
                                isThisUser &&
                                <Link to='/profile/edit' className='w-auto ms-5 btn btn-secondary float-end'>
                                    Edit Profile
                                </Link>
                            ) ||
                            <FollowButton isLoggedIn={isLoggedIn} thisUser={thisUser} otherUser={profileUser} />
                        }
                    </div>
                    <div className='row'>
                        <div className='col-7 col-md-9'>
                            <p className='text-muted mb-0'>{profileUser.biography}</p>
                        </div>
                    </div>
                </div>
                
                <hr className='border-2 border-top border-secondary' />

                <div className='row'>
                    <div className='col-3'>
                        <h5 className='p-0'>Followers</h5>
                        {(followers.length > 0 && <UserList users={followers} />) ||
                         (followers.length === 0 && <p>
                             {
                                (isThisUser && <span>You have </span>) ||
                                <span>{profileUser.username} has </span>
                            }
                             no followers
                        </p>)}
    
                        <h5 className='p-0 mt-3'>Following</h5>
                        {(following.length > 0 && <UserList users={following} />) ||
                         (isThisUser && <p>Add people to follow!</p>) ||
                         <p>{profileUser.username} is not following anyone</p>}
                    </div>
                    <div className='col-6 px-4'>
                        <ListOfPostsItem  />
                    </div>
                    <div className='col-3'>
                        <h5 className='p-0'>
                            {
                                (!isThisUser && <span>{profileUser.name}'s </span>) ||
                                (profileUser.creator && <span>Your </span>) || 
                                <span>Saved </span>
                            }
                            Songs
                        </h5>
                        {
                            (
                                usersSongs.length > 0 &&
                                <div className='list-group'>
                                    {
                                        usersSongs.map(song => 
                                            <Link to={`/songs/details/${song.id}`}
                                                    key={song.id}
                                                    className='list-group-item'>
                                                <SongItem song={song} />
                                            </Link>
                                        )
                                    }
                                </div>
                            ) ||
                            <p>
                                {
                                    (isThisUser && <span>You have </span>) ||
                                    <span>{profileUser.username} has </span>
                                }
                                no {!profileUser.creator && <span>saved</span>} songs
                            </p>
                        }
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loading />
    }
}

export default Profile;