import React, { useEffect, useState } from "react";
import { useProfile } from '../../contexts/profileContext';
import { useDispatch, useSelector } from "react-redux";
import PostList from "../Posts";
import * as service from '../../services/post-service';
import CreatePost from "../Posts/createPost";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { checkLoggedIn } = useProfile();
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

    const posts = useSelector(state => state.posts);
    useEffect(() => {
        //   
        const getPosts = async () => {
            let posts = [];

            if (loggedInUser) {
                if (loggedInUser.creator) {
                    posts = await service.findPostsBySongsList(loggedInUser.songs);
                } else {
                    posts = await service.findPostsByAuthorsList(loggedInUser.following);
                }
            } else {
                posts = await service.findAllPosts();
            }

            dispatch({
                type: 'FIND_ALL_POSTS',
                posts: posts
              });
        };
        getPosts();
    }, [loggedInUser]);

    const PostsHeader = () => {
        return (
            <h4 className="ms-5">
                {
                    loggedInUser &&
                    (
                        (
                            loggedInUser.creator &&
                            'What people are saying about your songs'
                        ) ||
                        'Discussion on your favorite songs'
                    ) ||
                    'What the community is talking about'
                }
            </h4>
        );
    };
    
    return (
        <div className="row mt-3">
            <div className="col">
                <h4>Maybe a list of newest users</h4>
            </div>
            <div className="col-5">
                <CreatePost canPost={true} />
                <PostsHeader />
                <PostList posts={posts} className='mt-4 mx-5' />
            </div>
        </div>
    );
};

export default HomeScreen;
