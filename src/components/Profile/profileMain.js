import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListOfPostsItem from "../Posts/list-of-post-item";
import SongItem from "../SongListItem";
import UserList from "../user-list";
import * as userService from '../../services/user-service';
import * as songService from '../../services/song-service';

const ProfileMain = ({
    isThisUser = false,
    profileUser = {
        name: "",
        username: "",
        password: "",
        creator: false,
        biography: "",
        image: "",
        songs: [],
        playlists: [],
        followers: [],
        following: [],
    }
}) => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [usersSongs, setUsersSongs] = useState([]);

    // Get profile user's followers, following, and song data objects
    useEffect(() => {
        if (profileUser) {
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
        }
    }, [profileUser]);

    return (
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
    );
};

export default ProfileMain;