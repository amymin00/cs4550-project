import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SongItem from "../SongListItem";
import UserList from "../user-list";
import PostList from "../Posts";
import CreatePost from "../Posts/createPost";
import * as userService from '../../services/user-service';
import * as songService from '../../services/song-service';
import * as postService from '../../services/post-service';

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
    const [usersPosts, setUsersPosts] = useState([]);

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
            };
            const findUsersPosts = async () => {
                const posts = await postService.findPostsByAuthor(profileUser._id);
                setUsersPosts(posts);
            };
            const getUsersObjects = async () => {
                await Promise.all([
                    findUsersFollowers(),
                    findUsersFollowing(),
                    findUsersSongs(),
                    findUsersPosts()
                ]);
            };
            getUsersObjects();
        }
    }, [profileUser]);

    return (
        <div className='row'>
            {/* Left column */}
            <div className='col-4 col-lg-3 d-none d-md-block'>
                <h5 className='p-0'>Followers</h5>
                {(followers.length > 0 && <UserList users={followers} />) ||
                        <p>
                            {
                                (isThisUser && 'You have ') ||
                                `${profileUser.username} has `
                            }
                            no followers
                        </p>
                }
                <h5 className='p-0 mt-3'>Following</h5>
                {(following.length > 0 && <UserList users={following} />) ||
                    (isThisUser && <p>Add people to follow!</p>) ||
                    <p>{profileUser.username} is not following anyone</p>}
            </div>

            {/* Middle column */}
            <div className='col-12 col-md-8 col-lg-6 px-3 px-xl-5'>
                {isThisUser && <CreatePost />}
                {(usersPosts.length > 0 && 
                    <div className="mx-3 mx-xl-5">
                        <h5 className="text-center">
                            {(isThisUser && 'Your') || `${profileUser.name}'s`} posts
                        </h5>
                        <PostList posts={usersPosts} />
                    </div>) ||
                    <p>
                        {
                            (isThisUser && 'You have ') ||
                            `${profileUser.username} has `
                        }
                        no posts to display
                        {
                            isThisUser && '. Create one now and share your songs with everyone!'
                        }
                    </p>
                }
            </div>

            {/* Right column */}
            <div className='col-3 d-none d-lg-block'>
                <h5 className='p-0'>
                    {
                        (!isThisUser && `${profileUser.name}'s `) ||
                        (profileUser.creator && 'Your ') || 
                        'Saved '
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
                            (isThisUser && 'You have ') ||
                            `${profileUser.username} has `
                        }
                        no {!profileUser.creator && 'saved'} songs
                    </p>
                }
            </div>
        </div>
    );
};

export default ProfileMain;