import React, {useEffect} from "react";
import {useDispatch, useSelector}
  from "react-redux";
import * as service
  from '../../services/post-service';
import PostListItem from "./list-of-post-item";

const PostList = () => {
  const posts = useSelector(
      state => state.posts);
  const dispatch = useDispatch();
  const findAllPosts = async () => {
    const posts = await service.findAllPosts();
    dispatch({
      type: 'FIND_ALL_POSTS',
      posts: posts
    });
  }
  useEffect(findAllPosts, [dispatch]);
  return (
      <div className="mt-5">
        <ul className="list-group">
          {
              posts.map && posts.map(post =>
                  <PostListItem key={post._id}
                                post={post}/>)
          }


        </ul></div>
  );
}

export default PostList;