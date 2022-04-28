import React, { useState } from "react";
import PostList from "../Posts";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/post-actions";
import Footer from "../Footer";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState();
  const post = {
    title: "", // TODO add when srtyling new post
    author: "", // TODO after implementing getUser by id
    timestamp: 0, // handles in controller
    song: "", // TODO after linking spotify
    text: newPost,
    likes: [],
    comments: [],
  };
  return (
    <div>
      <div>
        <textarea
          className="form-control"
          value={newPost}
          placeholder="Cool post!"
          onChange={(event) => setNewPost(event.target.value)}
        ></textarea>
        <button
          className="btn btn-primary rounded-pill mt-2 mb-2 float-end"
          onClick={() => createPost(dispatch, newPost)}
        >
          Post
        </button>
      </div>
      <PostList />
      <Footer />
    </div>
  );
};

export default HomeScreen;
