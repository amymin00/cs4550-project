import React from "react";
import {Link} from "react-router-dom";
import CommentList from "../Posts/Comments";
import PostList from "../Posts";

const HomeScreen = () => {
  return (
      <div>
        {/*<CommentList />*/}
        <PostList />
      </div>
  )
};

export default HomeScreen;