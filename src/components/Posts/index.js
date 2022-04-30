import React from "react";
import PostListItem from "./list-of-post-item";

const PostList = ({
    posts = [],
    className = ''
}) => {
  return (
    <div className={className}>
        <ul className="list-group">
            {
                posts.map && posts.map(post =>
                    <PostListItem key={post._id}
                                    post={post}/>)
            }
        </ul>
    </div>
  );
}

export default PostList;