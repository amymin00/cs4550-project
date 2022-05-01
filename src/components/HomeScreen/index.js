import React, { useEffect, useState } from "react";
import { useProfile } from '../../contexts/profileContext';
import { useDispatch, useSelector } from "react-redux";
import PostList from "../Posts";
import * as postService from '../../services/post-service';
import * as userService from '../../services/user-service';
import * as songService from "../../services/song-service";
import CreatePost from "../Posts/createPost";
import UserList from "../user-list";
import SongList from "../SongList";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { checkLoggedIn } = useProfile();
    const posts = useSelector(state => state.posts);
    const users = useSelector(state => state.users);
    const [songs, setSongs] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState();

    // Get profile user and currently logged in user
    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                setLoggedInUser(user);
            } catch (e) {
                console.log(`Caught error in HomeScreen index.js: ${e}`);
            }
        };
        check();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            let posts = [];

            if (loggedInUser) {
                if (loggedInUser.creator) {
                    posts = await postService.findPostsBySongsList(loggedInUser.songs);
                } else {
                    posts = await postService.findPostsByAuthorsList(loggedInUser.following);
                }
            } else {
                posts = await postService.findAllPosts();
            }

            dispatch({
                type: 'FIND_ALL_POSTS',
                posts: posts
            });
        };
        const getNewlyJoinedUsers = async () => {
            const users = await userService.findAllUsers();
            dispatch({
                type: 'FIND_ALL_USERS',
                users: users
            });
        };
        const getPopularSongs = async () => {
            if (songs.length === 0) {
                const songIds = await postService.findPopularSongs();
                const songs = await songService.findSongsById(songIds, true);
                setSongs(songs);
            }
        };

        const getObjectsLists = async () => {
            await Promise.all([
                getPosts(),
                getNewlyJoinedUsers(),
                getPopularSongs()
            ]);
        };
        getObjectsLists();
    }, [loggedInUser]);

    const PostsHeader = () => {
        return (
            <h4 className="ms-5">
                {
                    (
                        loggedInUser && (
                            (
                                loggedInUser.creator &&
                                'What people are saying about your songs'
                            ) ||
                            'Posts by your following list'
                        )
                    ) ||
                    'What the community is talking about'
                }
            </h4>
        );
    };
    
    return (
        <div className="mt-3">
            <div className="row mb-4">
                {
                    loggedInUser &&
                    <>
                        <h1><strong>Welcome {loggedInUser.name.split(' ')[0]}!</strong></h1>
                        <h3>Check out what the community has to say below</h3>
                    </>
                }
            </div>
            <div className="row">
                <div className="col-8 col-md-5 col-lg-6 pe-0 pe-md-2 pe-xl-5">
                    <div className="row">
                        <div className="col-12 col-lg-5">
                            <h4 className="mb-0">Newest members</h4>
                            <UserList users={users} className='mt-3' />
                        </div>
                        <div className="col-12 col-lg-7">
                            <h4 className="mb-0 mt-4 mt-lg-0">Popular songs</h4>
                            <SongList songs={songs} ranked={true} className='mt-3' />
                        </div>
                    </div>
                </div>
                <div className="mt-4 mt-lg-0 col-12 col-md-7 col-lg-6 ps-2 ps-xl-5">
                    <CreatePost canPost={true} className='ms-5' />
                    <PostsHeader />
                    {
                        (
                            posts.length > 0 &&
                            <PostList posts={posts} className='mt-3 mx-5' />
                        ) ||
                        <span className="mx-5">Nobody has posted in your community</span>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
