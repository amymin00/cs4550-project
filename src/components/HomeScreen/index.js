import React, { useEffect, useState } from "react";
import PostList from "../Posts";
import { useProfile } from '../../contexts/profileContext';
import * as service from '../../services/post-service';
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../Posts/createPost";

const HomeScreen = () => {
    const dispatch = useDispatch();

    const posts = useSelector(
        state => state.posts);
    const findAllPosts = async () => {
      const posts = await service.findAllPosts();
      dispatch({
        type: 'FIND_ALL_POSTS',
        posts: posts
      });
    }
    useEffect(findAllPosts, [dispatch]);
    
    return (
        <div className="row mt-3">
            <div className="col">
                <h4>Maybe a list of newest users</h4>
            </div>
            <div className="col-5">
                <CreatePost canPost={true} />
                <h4 className="ms-5">Latest Activity</h4>
                <PostList posts={posts} className='mt-4 mx-5' />
            </div>
        </div>
    );
};

export default HomeScreen;
