import React, { useEffect, useState } from "react";
import PostList from "../Posts";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/post-actions";
import { useProfile } from "../../contexts/profileContext";
import * as service from "../../services/user-service";
import UserList from "../user-list";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState();
  const [postAuthorId, setPostAuthorId] = useState();
  const { checkLoggedIn } = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [thisUser, setThisUser] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const check = async () => {
      try {
        const user = await checkLoggedIn();
        if (user) {
          setIsLoggedIn(true);
          setThisUser(user);
          setPostAuthorId(user._id);
        }
      } catch (e) {
        console.log(`Caught error in user-list-item.js: ${e}`);
      }
    };
    check();
  }, []);

  const post = {
    title: "New Post", // TODO add when styling new post
    author: postAuthorId,
    timestamp: 0,
    song: "3UXw2DNuCIWA5WshABJnbj", // TODO get from saved songs
    text: newPost,
    likes: [],
    comments: [],
  };

  const handleCreatePostOrAlertAnonUsers = () => {
    if (isLoggedIn) {
      createPost(dispatch, post);
    } else {
      alert("Please log in or create an account to post!");
    }
  };

  useEffect(() => {
    const findAllUsers = async () => {
      const users = await service.findAllUsers(thisUser);
      setUsers(users);
    };
    findAllUsers();
  });

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
          onClick={() => handleCreatePostOrAlertAnonUsers()}
        >
          Post
        </button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mt-5 period" style={{ color: 'white'}}>.</div>
            <UserList users={users} />
          </div>
          <div className="col">
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
